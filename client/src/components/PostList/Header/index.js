import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dropdown, Icon } from 'semantic-ui-react';
import {
  setCurrentCategory,
} from '../../../store/categories/actions';
import { setCurrentOrder } from '../../../store/order/actions';
import useCategories from '../../../hooks/useCategories';

const Header = memo(({
  categoryList = [],
  currentCategory,
  currentOrder,
  onChangeCategory,
  onChangeOrder,
  orderList,
}) => {
  const categoryOptions = useCategories(categoryList);

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
        options={orderList}
        defaultValue={currentOrder}
        onChange={(e, { value }) => onChangeOrder(value)}
      />
    </Container>
  );
});

Header.propTypes = {
  categoryList: PropTypes.array,
  currentCategory: PropTypes.string,
  currentOrder: PropTypes.string.isRequired,
  onChangeCategory: PropTypes.func.isRequired,
  onChangeOrder: PropTypes.func.isRequired,
  orderList: PropTypes.array.isRequired,
};

Header.defaultProps = {
  categoryList: [],
  currentCategory: '',
};

const mapStateToProps = ({
  categories: { list: categoryList, currentCategory },
  order: { currentOrder, list: orderList },
}) => ({
  categoryList,
  currentCategory,
  currentOrder,
  orderList,
});

const mapDispatchToProps = {
  onChangeCategory: setCurrentCategory,
  onChangeOrder: setCurrentOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
