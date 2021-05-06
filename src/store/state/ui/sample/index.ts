// FIXME: SAMPLE CODE

import { combineReducers } from '@reduxjs/toolkit';
import importerReducer, {
  ImporterState,
} from 'src/store/state/ui/sample/importers';
export interface SampleState {
  importers: ImporterState;
}
export default combineReducers({
  importers: importerReducer,
});
