import PropTypes from 'prop-types';

export const dropdownItemType = {
  key: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export const dropdownType = PropTypes.arrayOf(
  PropTypes.shape(dropdownItemType),
);
