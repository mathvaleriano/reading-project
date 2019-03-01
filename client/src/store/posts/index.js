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
  UP_VOTE_POST,
  DOWN_VOTE_POST,
} from './types';

const toggleDeletedPost = isRemoving => ({ posts = [], id }) => posts.map(
  post => (post.id === id ? { ...post, deleted: isRemoving } : post),
);

const removePost = toggleDeletedPost(true);
const undoRemovePost = toggleDeletedPost(false);

const updatePost = propsToUpdate => post => (
  post.id === propsToUpdate.id
    ? { ...post, ...propsToUpdate }
    : post
);

const toggleVote = ({ postId, voteScoreModifier }) => post => (
  post.id === postId
    ? { ...post, voteScore: post.voteScore + voteScoreModifier }
    : post
);

const upVote = postId => toggleVote({ postId, voteScoreModifier: 1 });
const downVote = postId => toggleVote({ postId, voteScoreModifier: -1 });

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
    case IS_FETCHING_POSTS:
    case SET_POSTS:
    case SET_CURRENT_POST:
      return { ...state, ...payload };
    case ADD_POST:
      return {
        ...state,
        posts: [
          { ...payload, voteScore: 1 },
          ...state.posts,
        ],
      };
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
        posts: state.posts.map(updatePost(payload)),
      };
    case UP_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(upVote(payload.id)),
      };
    case DOWN_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(downVote(payload.id)),
      };
    default:
      return state;
  }
};

export default reducer;
