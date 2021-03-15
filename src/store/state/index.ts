import app, { AppState } from 'src/store/state/app';
import domain, { DomainState } from 'src/store/state/domain';
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
