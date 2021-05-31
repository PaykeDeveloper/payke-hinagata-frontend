import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
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

const createUploadSlice = <Value>({
  domainName,
  domainSelector,
  selectMethod,
}: {
  domainName: string;
  domainSelector: (state: RootState) => UploadState<Value>;
  selectMethod: (value: Value) => UploadMethod;
}) => {
  const initialState: UploadState<Value> = {
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
      addRows(state, action: PayloadAction<{ values: Value[] }>) {
        const {
          payload: { values },
        } = action;
        const rows = values.map((value) => ({ key: nanoid(), value }));
        state.rows = state.rows.concat(castDrafts(rows));
        for (const row of rows) {
          state.metas[row.key] = {
            status: UploadStatus.Initial,
            error: null,
          };
        }
      },
      updateMeta(
        state,
        action: PayloadAction<{
          key: string;
          status?: UploadStatus;
          error?: StoreError | null;
        }>
      ) {
        const {
          payload: { key, status, error },
        } = action;
        if (!state.metas[key]) {
          return;
        }

        if (status) {
          state.metas[key]!.status = status;
        }
        if (error !== undefined) {
          state.metas[key]!.error = error;
        }
      },
      removeRow(state, action: PayloadAction<{ key: string }>) {
        const {
          payload: { key },
        } = action;
        state.rows = state.rows.filter((row) => row.key !== key);
        delete state.metas[key];
      },
      setRowsToWaiting(state, action: PayloadAction<{ keys: string[] }>) {
        const {
          payload: { keys },
        } = action;
        for (const key of keys) {
          const status = state.metas[key]?.status;
          if (status && !uploadProcessingStatuses.includes(status)) {
            state.metas[key]!.status = UploadStatus.Waiting;
          }
        }
      },
      setRowsToStopped(state, action: PayloadAction<{ keys: string[] }>) {
        const {
          payload: { keys },
        } = action;
        for (const key of keys) {
          if (state.metas[key]?.status === UploadStatus.Waiting) {
            state.metas[key]!.status = UploadStatus.Waiting;
          }
        }
      },
    },
  });

  type GetState = () => RootState;

  const uploadRow =
    (
      key: string,
      { addMethod, mergeMethod, removeMethod }: UploadMethods<Value>
    ) =>
    async (dispatch: StoreDispatch, getState: GetState) => {
      const { rows, metas } = domainSelector(getState());
      const row = rows.find((r) => r.key === key);
      const meta = metas[key];
      if (!row || !meta || meta.status !== UploadStatus.Waiting) {
        return undefined;
      }

      await dispatch(
        actions.updateMeta({ key, status: UploadStatus.Uploading })
      );

      const { value } = row;
      const method = selectMethod(value);
      switch (method) {
        case UploadMethod.Add: {
          const meta = await addMethod(value);
          return dispatch(actions.updateMeta({ key, ...meta }));
        }
        case UploadMethod.Merge: {
          const meta = await mergeMethod(value);
          return dispatch(actions.updateMeta({ key, ...meta }));
        }
        case UploadMethod.Remove: {
          const meta = await removeMethod(value);
          return dispatch(actions.updateMeta({ key, ...meta }));
        }
      }
    };

  const uploadRows =
    (keys: string[], methods: UploadMethods<Value>) =>
    async (dispatch: StoreDispatch) => {
      for (const key of keys) {
        await dispatch(uploadRow(key, methods));
      }
    };

  const selectStatusKeys = (state: RootState, status: UploadStatus) => {
    const { rows, metas } = domainSelector(state);
    return rows
      .map((row) => (metas[row.key]?.status === status ? row.key : undefined))
      .filter(notUndefined);
  };

  const uploadInitialRows =
    (methods: UploadMethods<Value>) =>
    async (dispatch: StoreDispatch, getState: GetState) => {
      const keys = selectStatusKeys(getState(), UploadStatus.Initial);

      await dispatch(actions.setRowsToWaiting({ keys }));

      const evenKeys = keys.filter((k, i) => i % 2 === 0);
      const oddKeys = keys.filter((k, i) => i % 2 === 1);
      return Promise.all([
        uploadRows(evenKeys, methods),
        uploadRows(oddKeys, methods),
      ]);
    };

  const stopWaitingRows =
    () => async (dispatch: StoreDispatch, getState: GetState) => {
      const keys = selectStatusKeys(getState(), UploadStatus.Waiting);
      await dispatch(actions.setRowsToStopped({ keys }));
    };

  return {
    ...otherSlice,
    actions: { ...actions, uploadInitialRows, stopWaitingRows },
    reducer,
  };
};

export default createUploadSlice;
