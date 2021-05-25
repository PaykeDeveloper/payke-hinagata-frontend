// FIXME: SAMPLE CODE

import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { siteName } from 'src/base/constants';
import { StoreDispatch } from 'src/store';
import { RootState } from 'src/store/state';
import {
  Project,
  ProjectInput,
} from 'src/store/state/domain/sample/projects/types';
import { StoreStatus } from 'src/store/types';
import {
  ProjectApiUrl,
  getProjectApiUrl,
  getProjectsApiUrl,
  DivisionApiUrl,
} from 'src/store/urls';
import {
  createPatchAsyncThunkWithOriginalUniqueId,
  createPostAsyncThunkWithOriginalUniqueId,
} from 'src/store/utils/createAsyncThunks';
import { DivisionPath } from 'src/view/routes/paths';
import {
  ProjectImporter,
  ProjectImporterInput,
  ImportStatus,
  ImportResult,
} from './types';
export interface ProjectImportersState {
  importRows: ProjectImporter[];
  meta: {
    results: {
      [id: string]: ImportResult;
    };
    status: StoreStatus;
    finished: number | undefined;
    total: number | undefined;
  };
}

const initialState: ProjectImportersState = {
  importRows: [],
  meta: {
    results: {},
    status: StoreStatus.Initial,
    finished: undefined,
    total: undefined,
  },
};

const createEntitiesSlice = <DomainState extends ProjectImportersState>(
  domainName: string,
  domainSelector: (state: RootState) => DomainState
) => {
  const addEntity = createPostAsyncThunkWithOriginalUniqueId<
    Project,
    DivisionApiUrl,
    ProjectInput
  >(`${domainName}/addEntity`, getProjectsApiUrl);
  const mergeEntity = createPatchAsyncThunkWithOriginalUniqueId<
    ProjectImporterInput,
    ProjectApiUrl,
    ProjectImporterInput
  >(`${domainName}/mergeEntity`, getProjectApiUrl);
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
      setImporters: (state, action: PayloadAction<ProjectInput[]>) => {
        const _projects: ProjectImporter[] = [];
        action.payload.forEach((project, index) => {
          const id: string = nanoid();
          _projects.push({
            id,
            project,
          });
          state.meta.results[id] = {
            status: ImportStatus.Waiting,
            error: undefined,
          };
          state.meta.total = (state.meta.total ?? 0) + 1;
        });
        state.importRows = _projects;
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
  const startImport =
    ({ divisionId }: DivisionPath) =>
    (dispatch: StoreDispatch, getState: GetState) => {
      async function importLoop(
        dispatch: StoreDispatch,
        importers: ProjectImporter[]
      ) {
        for (const importer of importers) {
          let bodyParams = importer?.project;
          if (bodyParams !== undefined) {
            if (bodyParams.id) {
              await dispatch(
                mergeEntity({
                  pathParams: {
                    divisionId,
                    projectId: `${importer.project.id}`,
                  },
                  bodyParams,
                  uniqueId: importer!.id,
                })
              );
            } else {
              await dispatch(
                addEntity({
                  pathParams: { divisionId },
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

const projectImportersSlice = createEntitiesSlice(
  'projectImporters',
  (state) => state.ui.sample.importers.projects
);

export const projectImportersActions = projectImportersSlice.actions;
export const projectImportersReducer = projectImportersSlice.reducer;
