import initialState from './state';
import {
  SET_ERRORS,
  IS_FETCHING_COMMENTS,
  SET_COMMENTS,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UNDO_REMOVE_COMMENT,
  UPDATE_COMMENT,
  UP_VOTE_COMMENT,
  DOWN_VOTE_COMMENT,
} from './types';

const toggleDeletedComment = isRemoving => ({
  comments = [],
  id,
}) => comments.map(
  comment => (
    comment.id === id
      ? { ...comment, deleted: isRemoving }
      : comment
  ),
);

const removeComment = toggleDeletedComment(true);
const undoRemoveComment = toggleDeletedComment(false);

const updateComment = ({
  comments = [],
  newValues,
}) => comments.map(
  comment => (comment.id === newValues.id
    ? { ...comment, ...newValues }
    : comment
  ),
);

const toggleVote = ({ commentId, voteScoreModifier }) => comment => (
  comment.id === commentId
    ? { ...comment, voteScore: comment.voteScore + voteScoreModifier }
    : comment
);

const upVote = commentId => toggleVote({ commentId, voteScoreModifier: 1 });
const downVote = commentId => toggleVote({ commentId, voteScoreModifier: -1 });

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ERRORS:
    case IS_FETCHING_COMMENTS:
    case SET_COMMENTS:
      return { ...state, ...payload };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [
          { ...payload, voteScore: 1 },
          ...state.comments,
        ],
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        comments: removeComment({
          comments: state.comments,
          id: payload,
        }),
      };
    case UNDO_REMOVE_COMMENT:
      return {
        ...state,
        comments: undoRemoveComment({
          comments: state.comments,
          id: payload,
        }),
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: updateComment({
          comments: state.comments,
          newValues: payload,
        }),
      };
    case UP_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(upVote(payload.id)),
      };
    case DOWN_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map(downVote(payload.id)),
      };
    default:
      return state;
  }
};

export default reducer;
