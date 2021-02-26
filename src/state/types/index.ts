import { AppState } from './app';
import { DomainState } from './domain';
// import { UiState } from './ui';

export interface RootState {
  app: AppState;
  domain: DomainState;
  // ui: UiState;
}
