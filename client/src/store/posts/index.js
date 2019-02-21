import initialState from './state';
import {
  SET_ERRORS,
  IS_FETCHING_POSTS,
  SET_POSTS,
  ADD_POST,
  REMOVE_POST,
  UNDO_REMOVE_POST,
  UPDATE_POST,
  SET_CURRENT_POST,
} from './types';

const toggleDeletedPost = isRemoving => ({ posts = [], id }) => posts.map(
  post => (post.id === id ? { ...post, deleted: isRemoving } : post),
);

const removePost = toggleDeletedPost(true);
const undoRemovePost = toggleDeletedPost(false);

const updatePost = ({ posts = [], newValues }) => posts.map(
  post => (post.id === newValues.id
    ? { ...post, ...newValues }
    : post
  ),
);

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
    case IS_FETCHING_POSTS:
    case SET_POSTS:
    case SET_CURRENT_POST:
      return { ...state, ...payload };
    case ADD_POST:
      return { ...state, posts: [payload, ...state.posts] };
    case REMOVE_POST:
      return {
        ...state,
        posts: removePost({ posts: state.posts, id: payload }),
      };
    case UNDO_REMOVE_POST:
      return {
        ...state,
        posts: undoRemovePost({ posts: state.posts, id: payload }),
      };
    case UPDATE_POST:
      return {
        ...state,
        posts: updatePost({ posts: state.posts, newValues: payload }),
      };
    default:
      return state;
  }
};

export default reducer;
