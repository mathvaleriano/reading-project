import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dropdown, Icon } from 'semantic-ui-react';
import {
  getCategories as getCategoriesAction,
  setCurrentCategory,
} from '../../../store/categories/actions';

const orders = [
  { key: 'timestamp', value: 'timestamp', text: 'Timestamp' },
  { key: 'commentCount', value: 'commentCount', text: 'With more comments' },
];

const Header = ({
  categories = [],
  currentCategory,
  getCategories,
  onChangeCategory,
}) => {
  useEffect(() => {
    getCategories();
  }, []);

  const categoryOptions = categories.map(
    ({ name, path }) => ({ key: path, text: name, value: path }),
  );

  return (
    <Container textAlign="right">
      <Icon name="filter" />
        Order by
      {' '}
      <Dropdown
        inline
        value={currentCategory}
        options={categoryOptions}
        onChange={(e, { value }) => onChangeCategory(value)}
      />
      <Icon name="unordered list" />
        Order by
      {' '}
      <Dropdown
        inline
        options={orders}
        defaultValue={orders[0].value}
      />
    </Container>
  );
};

Header.propTypes = {
  categories: PropTypes.array,
  currentCategory: PropTypes.string,
  getCategories: PropTypes.func.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
};

Header.defaultProps = {
  categories: [],
  currentCategory: '',
};

const mapStateToProps = ({
  categories: { list, currentCategory },
}) => ({
  categories: list,
  currentCategory,
});

const mapDispatchToProps = {
  getCategories: getCategoriesAction,
  onChangeCategory: setCurrentCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
