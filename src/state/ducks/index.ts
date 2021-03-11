import app, { AppState } from './app';
import domain, { DomainState } from './domain';
// import ui from './ui';

export interface RootState {
  app: AppState;
  domain: DomainState;
  // ui: UiState;
}

const reducers = {
  app,
  domain,
  // ui,
};

export default reducers;
