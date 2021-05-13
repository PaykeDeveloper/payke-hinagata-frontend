// FIXME: SAMPLE CODE

import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { StoreDispatch } from 'src/store';
import { RootState } from 'src/store/state';
import { Book, BookInput } from 'src/store/state/domain/sample/books/types';
import { StoreStatus } from 'src/store/types';
import { BookApiUrl, getBookApiUrl, getBooksApiUrl } from 'src/store/urls';
import {
  createPatchAsyncThunkWithOriginalUniqueId,
  createPostAsyncThunkWithOriginalUniqueId,
} from 'src/store/utils/createAsyncThunks';
import {
  BookImporter,
  BookImporterInput,
  ImportStatus,
  ImportResult,
} from './types';
export interface BookImportersState {
  importRows: BookImporter[];
  meta: {
    results: {
      [id: string]: ImportResult;
    };
    status: StoreStatus;
    finished: number | undefined;
    total: number | undefined;
  };
}

const initialState: BookImportersState = {
  importRows: [],
  meta: {
    results: {},
    status: StoreStatus.Initial,
    finished: undefined,
    total: undefined,
  },
};

const createEntitiesSlice = <DomainState extends BookImportersState>(
  domainName: string,
  domainSelector: (state: RootState) => DomainState
) => {
  const addEntity = createPostAsyncThunkWithOriginalUniqueId<
    Book,
    {},
    BookInput
  >(`${domainName}/addEntity`, getBooksApiUrl);
  const mergeEntity = createPatchAsyncThunkWithOriginalUniqueId<
    BookImporterInput,
    BookApiUrl,
    BookImporterInput
  >(`${domainName}/mergeEntity`, getBookApiUrl);
  type GetState = () => RootState;
  const slice = createSlice({
    name: `${siteName}/${domainName}`,
    initialState,
    reducers: {
      resetImporters: (state) => {
        state.importRows = [];
        state.meta.status = StoreStatus.Initial;
        state.meta.finished = undefined;
        state.meta.total = undefined;
        Object.keys(state.meta.results).forEach((key) => {
          delete state.meta.results[key];
        });
      },
      setImporters: (state, action: PayloadAction<BookInput[]>) => {
        const _books: BookImporter[] = [];
        action.payload.forEach((book, index) => {
          const id: string = nanoid();
          _books.push({
            id,
            book,
          });
          state.meta.results[id] = {
            status: ImportStatus.Waiting,
            error: undefined,
          };
          state.meta.total = (state.meta.total ?? 0) + 1;
        });
        state.importRows = _books;
      },
    },
    extraReducers: (builder) => {
      const extraBuilder = builder
        .addCase(addEntity.pending, (state, action) => {
          if (state.meta.results[action.meta.arg.uniqueId!] !== undefined) {
            state.meta.results[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Preparing;
            state.meta.finished = (state.meta.finished ?? 0) + 0;
          }
          if (state.meta.status === StoreStatus.Initial) {
            state.meta.status = StoreStatus.Started;
          }
        })
        .addCase(addEntity.fulfilled, (state, action) => {
          if (state.meta.results[action.meta.arg.uniqueId!] !== undefined) {
            state.meta.results[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Success;
            state.meta.finished = (state.meta.finished ?? 0) + 1;
          }
          if (
            state.meta.status === StoreStatus.Started &&
            state.meta.total === state.meta.finished
          ) {
            state.meta.status = StoreStatus.Done;
          }
        })
        .addCase(addEntity.rejected, (state, action) => {
          if (state.meta.results[action.meta.arg.uniqueId!] !== undefined) {
            state.meta.results[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Failed;
            state.meta.finished = (state.meta.finished ?? 0) + 1;
            state.meta.results[action.meta.arg.uniqueId!]!.error =
              action.payload;
          }
          if (
            state.meta.status === StoreStatus.Started &&
            state.meta.total === state.meta.finished
          ) {
            state.meta.status = StoreStatus.Done;
          }
        })
        .addCase(mergeEntity.pending, (state, action) => {
          if (state.meta.results[action.meta.arg.uniqueId!] !== undefined) {
            state.meta.results[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Preparing;
            state.meta.finished = (state.meta.finished ?? 0) + 0;
          }
          if (state.meta.status === StoreStatus.Initial) {
            state.meta.status = StoreStatus.Started;
          }
        })
        .addCase(mergeEntity.fulfilled, (state, action) => {
          if (state.meta.results[action.meta.arg.uniqueId!] !== undefined) {
            state.meta.results[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Success;
            state.meta.finished = (state.meta.finished ?? 0) + 1;
          }
          if (
            state.meta.status === StoreStatus.Started &&
            state.meta.total === state.meta.finished
          ) {
            state.meta.status = StoreStatus.Done;
          }
        })
        .addCase(mergeEntity.rejected, (state, action) => {
          if (state.meta.results[action.meta.arg.uniqueId!] !== undefined) {
            state.meta.results[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Failed;
            state.meta.results[action.meta.arg.uniqueId!]!.error =
              action.payload;
            state.meta.finished = (state.meta.finished ?? 0) + 1;
          }
          if (
            state.meta.status === StoreStatus.Started &&
            state.meta.total === state.meta.finished
          ) {
            state.meta.status = StoreStatus.Done;
          }
        });
      return extraBuilder;
    },
  });
  const { actions, reducer } = slice;
  const startImport = () => (dispatch: StoreDispatch, getState: GetState) => {
    async function importLoop(
      dispatch: StoreDispatch,
      importers: BookImporter[]
    ) {
      for (const importer of importers) {
        let bodyParams = importer?.book;
        if (bodyParams !== undefined) {
          if (bodyParams.id) {
            await dispatch(
              mergeEntity({
                pathParams: { bookId: bodyParams.id.toString() },
                bodyParams,
                uniqueId: importer!.id,
              })
            );
          } else {
            await dispatch(
              addEntity({
                pathParams: {},
                bodyParams,
                uniqueId: importer!.id,
              })
            );
          }
        }
      }
    }
    const ui = domainSelector(getState());
    return importLoop(dispatch, ui.importRows);
  };
  return {
    actions: {
      ...actions,
      startImport,
    },
    reducer,
  };
};

const bookImportersSlice = createEntitiesSlice(
  'bookImporters',
  (state) => state.ui.sample.importers.books
);

export const bookImportersActions = bookImportersSlice.actions;
export const bookImportersReducer = bookImportersSlice.reducer;
