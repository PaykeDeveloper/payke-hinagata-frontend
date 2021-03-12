import app, { AppState } from 'src/state/ducks/app';
import domain, { DomainState } from 'src/state/ducks/domain';
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
