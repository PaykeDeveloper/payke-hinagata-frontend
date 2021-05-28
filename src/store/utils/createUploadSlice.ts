import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { castDrafts, notUndefined } from 'src/base/utils';
import { StoreDispatch } from 'src/store/index';
import { RootState } from 'src/store/state';
import {
  StoreError,
  UploadMeta,
  UploadMethod,
  UploadMethods,
  UploadState,
  UploadStatus,
} from 'src/store/types';

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
      reset() {
        return initialState;
      },
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
      removeRow(state, action: PayloadAction<{ index: number }>) {
        const {
          payload: { index },
        } = action;
        const meta = state.metas[index];
        if (
          !meta ||
          [UploadStatus.Waiting, UploadStatus.Uploading].includes(meta.status)
        ) {
          return;
        }

        state.rows.slice(index);
        state.metas.slice(index);
      },
      setRowsToWaiting(state, action: PayloadAction<{ indexes: number[] }>) {
        const {
          payload: { indexes },
        } = action;
        for (const index of indexes) {
          const meta = state.metas[index];
          if (
            !meta ||
            [UploadStatus.Waiting, UploadStatus.Uploading].includes(meta.status)
          ) {
            continue;
          }

          state.metas[index]!.status = UploadStatus.Waiting;
        }
      },
      setRowsWaitingToStopped(state) {
        const indexes = state.metas.map((m, i) => i);
        for (const index of indexes) {
          if (state.metas[index]?.status === UploadStatus.Waiting) {
            state.metas[index]!.status = UploadStatus.Waiting;
          }
        }
      },
    },
  });

  type GetState = () => RootState;

  const uploadRow =
    (
      index: number,
      { addMethod, mergeMethod, removeMethod }: UploadMethods<Row>
    ) =>
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
    (indexes: number[], methods: UploadMethods<Row>) =>
    async (dispatch: StoreDispatch) => {
      for (const index of indexes) {
        await dispatch(uploadRow(index, methods));
      }
    };

  const uploadInitialRows =
    (methods: UploadMethods<Row>) =>
    async (dispatch: StoreDispatch, getState: GetState) => {
      const { metas } = domainSelector(getState());
      const indexes = metas
        .map((meta, index) =>
          meta.status === UploadStatus.Initial ? index : undefined
        )
        .filter(notUndefined);

      await dispatch(actions.setRowsToWaiting({ indexes }));

      const evenIndexes = indexes.filter((i) => i % 2 === 0);
      const oddIndexes = indexes.filter((i) => i % 2 === 1);
      return Promise.all([
        uploadRows(evenIndexes, methods),
        uploadRows(oddIndexes, methods),
      ]);
    };

  return {
    ...otherSlice,
    actions: { ...actions, uploadInitialRows },
    reducer,
  };
};

export default createUploadSlice;
