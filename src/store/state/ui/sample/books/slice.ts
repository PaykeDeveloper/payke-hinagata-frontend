// FIXME: SAMPLE CODE

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { StoreDispatch } from 'src/store';
import { RootState } from 'src/store/state';
import { Book, BookInput } from 'src/store/state/domain/sample/books/types';
import { StoreError } from 'src/store/types';
import { BookApiUrl, getBookApiUrl, getBooksApiUrl } from 'src/store/urls';
import {
  createBPatchAsyncThunk,
  createBPostAsyncThunk,
} from 'src/store/utils/createAsyncThunks';
import { BookImporter, BookImporterInput, ImportStatus } from './types';

export type ImportResults = {
  status: ImportStatus;
  error: StoreError | undefined;
};

export interface BookImportersState {
  importers: BookImporter[];
  importResults: {
    [id: string]: ImportResults;
  };
  meta: {
    finished: number;
    total: number;
  };
}

const initialState: BookImportersState = {
  importers: [],
  importResults: {},
  meta: {
    finished: 0,
    total: 0,
  },
};

const createEntitiesSlice = <DomainState extends BookImportersState>(
  domainName: string,
  domainSelector: (state: RootState) => DomainState
) => {
  const addEntity = createBPostAsyncThunk<Book, {}, BookInput>(
    `${domainName}/addEntity`,
    getBooksApiUrl
  );
  const mergeEntity = createBPatchAsyncThunk<
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
        state.importers = [];
        state.meta.finished = 0;
        state.meta.total = 0;
        Object.keys(state.importResults).forEach((key) => {
          delete state.importResults[key];
        });
      },
      addImporter: (state, action: PayloadAction<BookInput>) => {
        // FIXME: UUIDなどを自動で割り当てたい
        const id: string = `${Date.now()}`;
        state.importers.push({
          id,
          status: ImportStatus.Waiting,
          book: action.payload,
        });
        state.importResults[id] = {
          status: ImportStatus.Waiting,
          error: undefined,
        };
        state.meta.total += 1;
      },
      setImporters: (state, action: PayloadAction<BookInput[]>) => {
        const _books: BookImporter[] = [];
        action.payload.forEach((book, index) => {
          // FIXME: UUIDなどを自動で割り当てたい
          const id: string = `${index + 1}`;
          _books.push({
            id,
            status: ImportStatus.Waiting,
            book,
          });
          state.importResults[id] = {
            status: ImportStatus.Waiting,
            error: undefined,
          };
          state.meta.total += 1;
        });
        state.importers = _books;
      },
    },
    extraReducers: (builder) => {
      const extraBuilder = builder
        .addCase(addEntity.pending, (state, action) => {
          if (state.importResults[action.meta.arg.uniqueId!] !== undefined) {
            state.importResults[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Prepareing;
          }
        })
        .addCase(addEntity.fulfilled, (state, action) => {
          if (state.importResults[action.meta.arg.uniqueId!] !== undefined) {
            state.importResults[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Success;
            state.meta.finished += 1;
          }
        })
        .addCase(addEntity.rejected, (state, action) => {
          if (state.importResults[action.meta.arg.uniqueId!] !== undefined) {
            state.importResults[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Failed;
            state.meta.finished += 1;
          }
        })
        .addCase(mergeEntity.pending, (state, action) => {
          if (state.importResults[action.meta.arg.uniqueId!] !== undefined) {
            state.importResults[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Prepareing;
          }
        })
        .addCase(mergeEntity.fulfilled, (state, action) => {
          if (state.importResults[action.meta.arg.uniqueId!] !== undefined) {
            state.importResults[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Success;
            state.meta.finished += 1;
          }
        })
        .addCase(mergeEntity.rejected, (state, action) => {
          if (state.importResults[action.meta.arg.uniqueId!] !== undefined) {
            state.importResults[action.meta.arg.uniqueId!]!.status =
              ImportStatus.Failed;
            state.meta.finished += 1;
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
      for (const index in importers) {
        let bodyParams = importers[index]?.book;
        if (importers[index] !== undefined && bodyParams !== undefined) {
          if (bodyParams.id) {
            dispatch(
              mergeEntity({
                pathParams: { bookId: bodyParams.id.toString() },
                bodyParams,
                uniqueId: importers[index]!.id,
              })
            );
          } else {
            dispatch(
              addEntity({
                pathParams: {},
                bodyParams,
                uniqueId: importers[index]!.id,
              })
            );
          }
        }
      }
    }
    const ui = domainSelector(getState());
    importLoop(dispatch, ui.importers);
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
  (state) => state.ui.sample.bookImporters
);

export const bookImportersActions = bookImportersSlice.actions;
export const bookImportersReducer = bookImportersSlice.reducer;
