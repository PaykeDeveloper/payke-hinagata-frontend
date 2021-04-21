// FIXME: SAMPLE CODE

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import {
  createBPatchAsyncThunk,
  createBPostAsyncThunk,
} from 'src/store/utils/createAsyncThunks';
import { StoreDispatch } from 'src/store';
import { RootState } from 'src/store/state';
import { BookApiUrl, getBookApiUrl, getBooksApiUrl } from 'src/store/urls';
import { BookImporter, BookImporterInput, ImportStatus } from './types';
import { Book, BookInput } from 'src/store/state/domain/sample/books/types';
import { StoreError } from 'src/store/types';

export type ImportResults = {
  status: ImportStatus;
  error: StoreError | undefined;
};

export interface BookImportersState {
  importers: BookImporter[];
  importResults: Map<number, ImportResults>;
}

const initialState: BookImportersState = {
  importers: [],
};

export const getEntitiesInitialState = () => ({
  importers: [],
});

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
      resetEntities: (state) => ({
        ...state,
        importers: [],
      }),
      setImporters: (state, action: PayloadAction<BookImporter[]>) => ({
        ...state,
        importers: action.payload,
      }),
    },
    extraReducers: (builder) => {
      const extraBuilder = builder
        .addCase(addEntity.pending, (state, action) => {
          const currentIndex = state.importers.findIndex(
            (entity) => entity.id === action.meta.arg.uniqueId
          );
          console.log('pending:' + currentIndex);
          if (currentIndex !== -1) {
            state.importers[currentIndex]!.status = ImportStatus.Prepareing;
          }
        })
        .addCase(addEntity.fulfilled, (state, action) => {
          const currentIndex = state.importers.findIndex(
            (entity) => entity.id === action.meta.arg.uniqueId
          );
          console.log('fulfilled:' + currentIndex);
          if (currentIndex !== -1) {
            state.importers[currentIndex]!.status = ImportStatus.Success;
          }
        })
        .addCase(addEntity.rejected, (state, action) => {
          const currentIndex = state.importers.findIndex(
            (entity) => entity.id === action.meta.arg.uniqueId
          );
          console.log('rejected:' + currentIndex);
          if (currentIndex !== -1) {
            state.importers[currentIndex]!.status = ImportStatus.Failed;
          }
        })
        .addCase(mergeEntity.pending, (state, action) => {
          const currentIndex = state.importers.findIndex(
            (entity) => entity.id === action.meta.arg.uniqueId
          );
          if (currentIndex !== -1) {
            state.importers[currentIndex]!.status = ImportStatus.Prepareing;
          }
        })
        .addCase(mergeEntity.fulfilled, (state, action) => {
          const currentIndex = state.importers.findIndex(
            (entity) => entity.id === action.meta.arg.uniqueId
          );
          if (currentIndex !== -1) {
            state.importers[currentIndex]!.status = ImportStatus.Success;
          }
        })
        .addCase(mergeEntity.rejected, (state, action) => {
          const currentIndex = state.importers.findIndex(
            (entity) => entity.id === action.meta.arg.uniqueId
          );
          if (currentIndex !== -1) {
            state.importers[currentIndex]!.status = ImportStatus.Failed;
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
                uniqueId: importers[index]?.id,
              })
            );
          } else {
            dispatch(
              addEntity({
                pathParams: {},
                bodyParams,
                uniqueId: importers[index]?.id,
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

// createSliceでreducerとactionを同時に定義
const bookImportersSlice = createEntitiesSlice(
  'bookImporters',
  (state) => state.ui.sample.bookImporters
);

export const bookImportersActions = bookImportersSlice.actions;
export const bookImportersReducer = bookImportersSlice.reducer;
