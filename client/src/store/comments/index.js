import initialState from './state';
import {
  SET_ERRORS,
  IS_FETCHING_COMMENTS,
  SET_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UNDO_REMOVE_COMMENT,
  UPDATE_COMMENT,
} from './types';

const toggleDeletedComment = isRemoving => ({ comments = [], id }) => comments.map(
  comment => (comment.id === id ? { ...comment, deleted: isRemoving } : comment),
);

const removeComment = toggleDeletedComment(true);
const undoRemoveComment = toggleDeletedComment(false);

const updateComment = ({ comments = [], newValues }) => comments.map(
  comment => (comment.id === newValues.id
    ? { ...comment, ...newValues }
    : comment
  ),
);

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
    case IS_FETCHING_COMMENTS:
    case SET_COMMENTS:
      return { ...state, ...payload };
    case ADD_COMMENT:
      return { ...state, comments: [payload, ...state.comments] };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: removeComment({ comments: state.comments, id: payload }),
      };
    case UNDO_REMOVE_COMMENT:
      return {
        ...state,
        comments: undoRemoveComment({ comments: state.comments, id: payload }),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: updateComment({ comments: state.comments, newValues: payload }),
      };
    default:
      return state;
  }
};

export default reducer;
