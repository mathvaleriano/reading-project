import initialState from './state';
import {
  SET_ERRORS,
  IS_FETCHING,
  SET_POSTS,
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  SET_CURRENT_POST,
} from './types';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
    case IS_FETCHING:
    case SET_POSTS:
    case SET_CURRENT_POST:
      return { ...state, ...payload };
    case ADD_POST:
      return { ...state, posts: [payload, ...state.posts] };
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== payload),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map(post => (
          post.id === payload.id
            ? { ...post, ...payload }
            : post
        )),
      };
    default:
      return state;
  }
};

export default reducer;
