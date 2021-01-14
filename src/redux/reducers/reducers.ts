import { combineReducers } from 'redux';
import { getPostsReducer } from './PostReducers';
import { getShiftsReducer } from './ShiftReducers';

const rootReducer = combineReducers({
	posts: getPostsReducer,
	shifts: getShiftsReducer
});

export default rootReducer;