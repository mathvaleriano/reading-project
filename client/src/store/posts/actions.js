import postsApi from '../../api/posts';
import {
  SET_ERRORS,
  IS_FETCHING_POSTS,
  SET_POSTS,
  ADD_POST,
  REMOVE_POST,
  UNDO_REMOVE_POST,
  UPDATE_POST,
  SET_CURRENT_POST,
  DOWN_VOTE_POST,
  UP_VOTE_POST,
  MANIPULATE_QTY_COMMENTS,
  SET_CURRENT_POST_BY_ID,
} from './types';
import { getComments, setComments } from '../comments/actions';

export const setErrors = (errors = []) => ({
  type: SET_ERRORS,
  payload: { errors },
});

export const handleSetErrors = errors => (dispatch) => {
  dispatch(setErrors(errors));

  const timeout = setTimeout(() => {
    setErrors();
    clearTimeout(timeout);
  }, 5000);
};

export const setIsFetching = isFetching => ({
  type: IS_FETCHING_POSTS,
  payload: { isFetching },
});

export const setPosts = posts => ({
  type: SET_POSTS,
  payload: { posts },
});

export const handleGetPosts = request => async (dispatch) => {
  try {
    dispatch(setIsFetching(true));
    const posts = await request;
    dispatch(setPosts(posts));
  } catch (e) {
    throw e;
  } finally {
    dispatch(setIsFetching(false));
  }
};

export const getPosts = id => handleGetPosts(postsApi.getPosts(id));

export const getPostsByCategory = category => handleGetPosts(
  postsApi.getPostsByCategory(category),
);

export const addPost = post => ({
  type: ADD_POST,
  payload: post,
});

export const removePost = postId => ({
  type: REMOVE_POST,
  payload: postId,
});

export const undoRemovePost = postId => ({
  type: UNDO_REMOVE_POST,
  payload: postId,
});

export const handleAddPost = post => async (dispatch) => {
  try {
    dispatch(addPost(post));
    await postsApi.addPost(post);
  } catch (e) {
    dispatch(removePost(post.id));
    throw e;
  }
};

export const handleRemovePost = id => async (dispatch) => {
  try {
    dispatch(removePost(id));
    await postsApi.removePost(id);
  } catch (e) {
    dispatch(undoRemovePost(id));
    throw e;
  }
};

export const updatePost = ({ body, id, title }) => ({
  type: UPDATE_POST,
  payload: { id, body, title },
});

export const handleUpdatePost = ({
  body,
  post,
  title,
}) => async (dispatch) => {
  try {
    const { id } = post;
    dispatch(updatePost({ body, id, title }));
    await postsApi.updatePost({ body, id, title });
  } catch (e) {
    dispatch(updatePost(post));
    throw e;
  }
};

export const setCurrentPost = currentPost => ({
  type: SET_CURRENT_POST,
  payload: { currentPost },
});

export const setCurrentPostById = postId => ({
  type: SET_CURRENT_POST_BY_ID,
  payload: postId,
});

export const handleSetCurrentPost = currentPost => (dispatch) => {
  const hasFullInfos = typeof currentPost === 'object';
  const id = hasFullInfos ? currentPost.id : currentPost;
  const fnSetCurrentPost = hasFullInfos ? setCurrentPost : setCurrentPostById;

  dispatch(fnSetCurrentPost(currentPost));
  
  if (id) {
    dispatch(getComments(id));
  } else {
    dispatch(setComments());
  }
};

const upVote = id => ({
  type: UP_VOTE_POST,
  payload: { id },
});

const downVote = id => ({
  type: DOWN_VOTE_POST,
  payload: { id },
});

export const handleUpVote = id => async (dispatch) => {
  try {
    dispatch(upVote(id));
    await postsApi.upVotePost(id);
  } catch (e) {
    dispatch(downVote(id));
  }
};

export const handleDownVote = id => async (dispatch) => {
  try {
    dispatch(downVote(id));
    await postsApi.downVotePost(id);
  } catch (e) {
    dispatch(upVote(id));
  }
};

export const manipulateQtyComments = ({ id, value }) => ({
  type: MANIPULATE_QTY_COMMENTS,
  payload: { id, value },
});
