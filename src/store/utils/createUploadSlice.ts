import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { castDrafts, notUndefined } from 'src/base/utils';
import { StoreDispatch } from 'src/store/index';
import { RootState } from 'src/store/state';
import { StoreError } from 'src/store/types';

enum UploadStatus {
  Initial,
  Waiting,
  Uploading,
  Done,
  Failed,
  Stopped,
}

interface UploadMeta {
  status: UploadStatus;
  error: StoreError | null;
}

interface UploadState<Row> {
  rows: Row[];
  metas: UploadMeta[];
}

enum UploadMethod {
  Add,
  Merge,
  Remove,
}

const createUploadSlice = <Row>({
  domainName,
  domainSelector,
  selectMethod,
}: {
  domainName: string;
  domainSelector: (state: RootState) => UploadState<Row>;
  selectMethod: (row: Row) => UploadMethod;
}) => {
  const initialState: UploadState<Row> = {
    rows: [],
    metas: [],
  };
  const { actions, reducer, ...otherSlice } = createSlice({
    name: `${siteName}/upload/${domainName}`,
    initialState,
    reducers: {
      addRows(state, action: PayloadAction<{ rows: Row[] }>) {
        const {
          payload: { rows },
        } = action;
        state.rows = state.rows.concat(castDrafts(rows));
        const metas = Array<UploadMeta>(state.rows.length).fill({
          status: UploadStatus.Initial,
          error: null,
        });
        state.metas = state.metas.concat(metas);
      },
      removeRow(state, action: PayloadAction<{ index: number }>) {
        const {
          payload: { index },
        } = action;
        state.rows.slice(index);
        state.metas.slice(index);
      },
      reset() {
        return initialState;
      },
      updateMeta(
        state,
        action: PayloadAction<{
          index: number;
          status?: UploadStatus;
          error?: StoreError | null;
        }>
      ) {
        const {
          payload: { index, status, error },
        } = action;
        if (!state.metas[index]) {
          return;
        }

        if (status) {
          state.metas[index]!.status = status;
        }
        if (error !== undefined) {
          state.metas[index]!.error = error;
        }
      },
      setRowsToWaiting(state, action: PayloadAction<{ indexes: number[] }>) {
        const {
          payload: { indexes },
        } = action;
        for (const index of indexes) {
          if (!state.metas[index]) {
            continue;
          }

          if (
            ![UploadStatus.Waiting, UploadStatus.Uploading].includes(
              state.metas[index]!.status
            )
          ) {
            state.metas[index]!.status = UploadStatus.Waiting;
          }
        }
      },
    },
  });

  type GetState = () => RootState;
  interface Methods {
    addMethod: (dispatch: StoreDispatch, row: Row) => Promise<UploadMeta>;
    mergeMethod: (dispatch: StoreDispatch, row: Row) => Promise<UploadMeta>;
    removeMethod: (dispatch: StoreDispatch, row: Row) => Promise<UploadMeta>;
  }

  const uploadRow =
    (index: number, { addMethod, mergeMethod, removeMethod }: Methods) =>
    async (dispatch: StoreDispatch, getState: GetState) => {
      const { rows, metas } = domainSelector(getState());
      const row = rows[index];
      const meta = metas[index];
      if (!row || !meta || meta.status !== UploadStatus.Waiting) {
        return undefined;
      }

      await dispatch(
        actions.updateMeta({ index, status: UploadStatus.Uploading })
      );

      const method = selectMethod(row);
      switch (method) {
        case UploadMethod.Add: {
          // const result = await dispatch(projectsActions.addEntity({}));
          // if (projectsActions.addEntity.fulfilled.match(result)) {
          //   await dispatch(
          //     actions.updateMeta({ index, status: UploadStatus.Done })
          //   );
          // } else if (projectsActions.addEntity.rejected.match(result)) {
          //   await dispatch(
          //     actions.updateMeta({
          //       index,
          //       status: UploadStatus.Failed,
          //       error: result.payload,
          //     })
          //   );
          // }
          const meta = await addMethod(dispatch, row);
          return dispatch(actions.updateMeta({ index, ...meta }));
        }
        case UploadMethod.Merge: {
          const meta = await mergeMethod(dispatch, row);
          return dispatch(actions.updateMeta({ index, ...meta }));
        }
        case UploadMethod.Remove: {
          const meta = await removeMethod(dispatch, row);
          return dispatch(actions.updateMeta({ index, ...meta }));
        }
      }
    };

  const uploadRows =
    (indexes: number[], methods: Methods) =>
    async (dispatch: StoreDispatch) => {
      for (const index of indexes) {
        await dispatch(uploadRow(index, methods));
      }
    };

  const uploadWaitingRows =
    (methods: Methods) =>
    async (dispatch: StoreDispatch, getState: GetState) => {
      const { metas } = domainSelector(getState());
      const indexes = metas
        .map((meta, index) =>
          meta.status === UploadStatus.Waiting ? index : undefined
        )
        .filter(notUndefined);

      const evenIndexes = indexes.filter((i) => i % 2 === 0);
      const oddIndexes = indexes.filter((i) => i % 2 === 1);
      return Promise.all([
        uploadRows(evenIndexes, methods),
        uploadRows(oddIndexes, methods),
      ]);
    };

  return {
    ...otherSlice,
    actions: { ...actions, uploadWaitingRows },
    reducer,
  };
};

export default createUploadSlice;
