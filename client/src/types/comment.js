import PropTypes from 'prop-types';

export const commentSummaryType = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export const commentActionsType = {
  parentId: PropTypes.string.isRequired,
  voteScore: PropTypes.number,
};

export const commentType = {
  ...commentSummaryType,
  ...commentActionsType,
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
