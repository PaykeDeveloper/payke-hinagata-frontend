import { EntityState } from './base';

export interface Status {
  isAuthenticated: boolean;
}

export interface AppState {
  status: EntityState<Status, unknown>;
}
