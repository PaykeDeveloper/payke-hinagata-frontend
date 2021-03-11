import { Status } from 'src/state/ducks/app/status/types';
import { EntityState } from 'src/state/types';

export interface AppState {
  status: EntityState<Status, unknown>;
}
