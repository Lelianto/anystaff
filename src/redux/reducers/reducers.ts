import { combineReducers } from 'redux';
import { getShiftsReducer } from './ShiftReducers';

const rootReducer = combineReducers({
	shifts: getShiftsReducer
});

export default rootReducer;