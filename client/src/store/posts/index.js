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
  MANIPULATE_QTY_COMMENTS,
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

const updateVoteScore = ({ post, voteScoreModifier }) => ({
  ...post, voteScore: post.voteScore + voteScoreModifier,
});

const toggleVote = ({ postId, voteScoreModifier }) => post => (
  post.id === postId
    ? updateVoteScore({ post, voteScoreModifier })
    : post
);

const upVote = postId => toggleVote({ postId, voteScoreModifier: 1 });
const downVote = postId => toggleVote({ postId, voteScoreModifier: -1 });

const updateQtyComments = ({ post, value }) => (
  { ...post, commentCount: post.commentCount + value }
);

const handleUpdateQtyComments = ({ id, value = 1 }) => post => (
  post.id === id
    ? updateQtyComments({ post, value })
    : post
);

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
        currentPost: state.currentPost && { ...state.currentPost, deleted: true },
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
        currentPost: state.currentPost && updatePost(payload)(state.currentPost),
      };
    case UP_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(upVote(payload.id)),
        currentPost: state.currentPost && updateVoteScore({
          post: state.currentPost,
          voteScoreModifier: 1,
        }),
      };
    case DOWN_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(downVote(payload.id)),
        currentPost: state.currentPost && updateVoteScore({
          post: state.currentPost,
          voteScoreModifier: -1,
        }),
      };
    case MANIPULATE_QTY_COMMENTS:
      return {
        ...state,
        posts: state.posts.map(handleUpdateQtyComments(payload)),
        currentPost: state.currentPost && updateQtyComments({
          post: state.currentPost,
          value: payload.value,
        }),
      };
    default:
      return state;
  }
};

export default reducer;
