import { AppState } from 'src/state/ducks/app/types';
import { DomainState } from 'src/state/ducks/domain/types';

export interface RootState {
  app: AppState;
  domain: DomainState;
  // ui: UiState;
}
