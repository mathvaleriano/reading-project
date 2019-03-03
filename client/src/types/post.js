import PropTypes from 'prop-types';

export const postMetaType = {
  category: PropTypes.string,
  commentCount: PropTypes.number,
  voteScore: PropTypes.number,
};

export const postMetaTypeDefaultValues = {
  category: '',
  commentCount: 0,
  voteScore: 0,
};

export const postSummaryType = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export const postType = {
  ...postMetaType,
  ...postSummaryType,
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
