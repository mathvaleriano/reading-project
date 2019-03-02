import { combineReducers } from 'redux';
import categories from './categories';
import comments from './comments';
import order from './order';
import posts from './posts';

export default combineReducers({
  categories,
  comments,
  order,
  posts,
});
