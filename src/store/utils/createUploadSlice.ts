import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { castDraft } from 'immer';
import { siteName } from 'src/base/constants';
import { castDrafts, notUndefined } from 'src/base/utils';
import { StoreDispatch } from 'src/store/index';
import { RootState } from 'src/store/state';
import {
  StoreError,
  UploadMethod,
  UploadMethods,
  UploadState,
  UploadStatus,
} from 'src/store/types';

export const uploadProcessingStatuses = [
  UploadStatus.Waiting,
  UploadStatus.Uploading,
];

const createUploadSlice = <Data, PathParams>({
  domainName,
  domainSelector,
  selectMethod,
}: {
  domainName: string;
  domainSelector: (state: RootState) => UploadState<Data, PathParams>;
  selectMethod: (data: Data) => UploadMethod;
}) => {
  const initialState: UploadState<Data, PathParams> = {
    rows: [],
    metas: {},
  };
  const { actions, reducer, ...otherSlice } = createSlice({
    name: `${siteName}/upload/${domainName}`,
    initialState,
    reducers: {
      reset() {
        return initialState;
      },
      addRows(state, action: PayloadAction<{ dataList: Data[] }>) {
        const {
          payload: { dataList },
        } = action;
        const rows = dataList.map((data) => ({ id: nanoid(), data }));
        state.rows = state.rows.concat(castDrafts(rows));
        for (const row of rows) {
          state.metas[row.id] = {
            status: UploadStatus.Initial,
            error: null,
          };
        }
      },
      updateMeta(
        state,
        action: PayloadAction<{
          id: string;
          status?: UploadStatus;
          error?: StoreError | null;
        }>
      ) {
        const {
          payload: { id, status, error },
        } = action;
        if (!state.metas[id]) {
          return;
        }

        if (status) {
          state.metas[id]!.status = status;
        }
        if (error !== undefined) {
          state.metas[id]!.error = error;
        }
      },
      removeRow(state, action: PayloadAction<{ id: string }>) {
        const {
          payload: { id },
        } = action;
        state.rows = state.rows.filter((row) => row.id !== id);
        delete state.metas[id];
      },
      setRowsToWaiting(state, action: PayloadAction<{ ids: string[] }>) {
        const {
          payload: { ids },
        } = action;
        for (const id of ids) {
          const status = state.metas[id]?.status;
          if (
            status !== undefined &&
            !uploadProcessingStatuses.includes(status)
          ) {
            state.metas[id]!.status = UploadStatus.Waiting;
          }
        }
      },
      setRowsToStopped(state, action: PayloadAction<{ ids: string[] }>) {
        const {
          payload: { ids },
        } = action;
        for (const id of ids) {
          if (state.metas[id]?.status === UploadStatus.Waiting) {
            state.metas[id]!.status = UploadStatus.Initial;
          }
        }
      },
      setPathParams(state, action: PayloadAction<{ pathParams: PathParams }>) {
        const {
          payload: { pathParams },
        } = action;
        state.pathParams = castDraft(pathParams);
      },
    },
  });

  type GetState = () => RootState;

  const uploadRow =
    (
      id: string,
      { addMethod, mergeMethod, removeMethod }: UploadMethods<Data>
    ) =>
    async (dispatch: StoreDispatch, getState: GetState) => {
      const { rows, metas } = domainSelector(getState());
      const row = rows.find((r) => r.id === id);
      const meta = metas[id];
      if (!row || !meta || meta.status !== UploadStatus.Waiting) {
        return undefined;
      }

      await dispatch(
        actions.updateMeta({ id: id, status: UploadStatus.Uploading })
      );

      const { data } = row;
      const method = selectMethod(data);
      switch (method) {
        case UploadMethod.Add: {
          const meta = await addMethod(data);
          return dispatch(actions.updateMeta({ id: id, ...meta }));
        }
        case UploadMethod.Merge: {
          const meta = await mergeMethod(data);
          return dispatch(actions.updateMeta({ id: id, ...meta }));
        }
        case UploadMethod.Remove: {
          const meta = await removeMethod(data);
          return dispatch(actions.updateMeta({ id: id, ...meta }));
        }
      }
    };

  const uploadRows =
    (ids: string[], methods: UploadMethods<Data>) =>
    async (dispatch: StoreDispatch) => {
      for (const id of ids) {
        await dispatch(uploadRow(id, methods));
      }
    };

  const uploadInitialRow =
    (id: string, methods: UploadMethods<Data>) =>
    async (dispatch: StoreDispatch) => {
      const ids = [id];
      await dispatch(actions.setRowsToWaiting({ ids }));
      return dispatch(uploadRows(ids, methods));
    };

  const selectStatusIds = (state: RootState, status: UploadStatus) => {
    const { rows, metas } = domainSelector(state);
    return rows
      .map((row) => (metas[row.id]?.status === status ? row.id : undefined))
      .filter(notUndefined);
  };

  const uploadInitialRows =
    (methods: UploadMethods<Data>) =>
    async (dispatch: StoreDispatch, getState: GetState) => {
      const ids = selectStatusIds(getState(), UploadStatus.Initial);

      await dispatch(actions.setRowsToWaiting({ ids }));

      const evenIds = ids.filter((k, i) => i % 2 === 0);
      const oddIds = ids.filter((k, i) => i % 2 === 1);
      return Promise.all([
        dispatch(uploadRows(evenIds, methods)),
        dispatch(uploadRows(oddIds, methods)),
      ]);
    };

  const stopWaitingRows =
    () => async (dispatch: StoreDispatch, getState: GetState) => {
      const ids = selectStatusIds(getState(), UploadStatus.Waiting);
      return dispatch(actions.setRowsToStopped({ ids }));
    };

  return {
    ...otherSlice,
    actions: {
      ...actions,
      uploadInitialRow,
      uploadInitialRows,
      stopWaitingRows,
    },
    reducer,
  };
};

export default createUploadSlice;
