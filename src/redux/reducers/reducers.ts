import { combineReducers } from 'redux';
import { getPostsReducer } from './PostReducers';

const rootReducer = combineReducers({
	posts: getPostsReducer
});

export default rootReducer;