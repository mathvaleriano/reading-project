import commentsApi from '../../api/comments';
import {
  SET_ERRORS,
  SET_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UNDO_REMOVE_COMMENT,
  UPDATE_COMMENT,
  IS_FETCHING_COMMENTS,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
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
  type: IS_FETCHING_COMMENTS,
  payload: { isFetching },
});

export const setComments = (comments = []) => ({
  type: SET_COMMENTS,
  payload: { comments },
});

export const getComments = postId => async (dispatch) => {
  try {
    dispatch(setIsFetching(true));
    const comments = await commentsApi.getComments(postId);
    dispatch(setComments(comments));
  } catch (e) {
    throw e;
  } finally {
    dispatch(setIsFetching(false));
  }
};

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const removeComment = id => ({
  type: REMOVE_COMMENT,
  payload: id,
});

export const undoRemoveComment = id => ({
  type: UNDO_REMOVE_COMMENT,
  payload: id,
});

export const handleAddComment = comment => async (dispatch) => {
  try {
    dispatch(addComment(comment));
    await commentsApi.addComment(comment);
  } catch (e) {
    //  TODO remover da listagem : dispatch(removeComment);
    throw e;
  }
};

export const handleRemoveComment = comment => async (dispatch) => {
  const { id } = comment;
  try {
    dispatch(removeComment(id));
    await commentsApi.removeComment(id);
  } catch (e) {
    dispatch(undoRemoveComment(id));
    throw e;
  }
};

export const updateComment = ({ body, id, timestamp }) => ({
  type: UPDATE_COMMENT,
  payload: { body, id, timestamp },
});

export const handleUpdateComment = ({
  body,
  comment,
  timestamp,
}) => async (dispatch) => {
  try {
    const { id } = comment;
    dispatch(updateComment({ body, timestamp }));
    await commentsApi.updateComment({ id, body, timestamp });
  } catch (e) {
    dispatch(updateComment(comment));
    throw e;
  }
};

const upVote = id => ({
  type: UP_VOTE_COMMENT,
  payload: { id },
});

const downVote = id => ({
  type: DOWN_VOTE_COMMENT,
  payload: { id },
});

export const handleUpVote = id => async (dispatch) => {
  try {
    dispatch(upVote(id));
    await commentsApi.upVoteComment(id);
  } catch (e) {
    dispatch(downVote(id));
  }
};

export const handleDownVote = id => async (dispatch) => {
  try {
    dispatch(downVote(id));
    await commentsApi.downVoteComment(id);
  } catch (e) {
    dispatch(upVote(id));
  }
};
