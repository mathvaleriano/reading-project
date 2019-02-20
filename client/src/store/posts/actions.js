import postsApi from '../../api/posts';
import {
  SET_ERRORS,
  IS_FETCHING,
  SET_POSTS,
  ADD_POST,
  REMOVE_POST,
  UPDATE_POST,
  SET_CURRENT_POST,
} from './types';

const setErrors = (errors = []) => ({
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
  type: IS_FETCHING,
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

export const handleAddPost = post => async (dispatch) => {
  try {
    dispatch(addPost(post));
    await postsApi.addPost(post);
  } catch (e) {
    dispatch(removePost);
    throw e;
  }
};

export const handleRemovePost = post => async (dispatch) => {
  try {
    const { id } = post;
    dispatch(removePost(id));
    await postsApi.removePost(id);
  } catch (e) {
    dispatch(addPost(post));
    throw e;
  }
};

export const updatePost = ({ body, id, title }) => ({
  type: UPDATE_POST,
  payload: { id, body, title },
});

export const handleUpdatePost = ({ body, post, title }) => async (dispatch) => {
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
