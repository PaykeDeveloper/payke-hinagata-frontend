import { AppState } from './app';

export interface DomainState {}

export interface UiState {}

export interface RootState {
  // domain: DomainState;
  // ui: UiState;
  app: AppState;
}
