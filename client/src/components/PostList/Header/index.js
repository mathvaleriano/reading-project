import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Container, Dropdown, Icon } from 'semantic-ui-react';
import { setCurrentOrder } from '../../../store/order/actions';
import useCategories from '../../../hooks/useCategories';
import { dropdownType } from '../../../types/dropdown';

const Header = memo(({
  categoryList = [],
  currentOrder,
  onChangeOrder,
  orderList,
  history,
  match: { params: { category = '' } },
}) => {
  const defaultCategoryOption = {
    key: 'category',
    text: 'category',
    value: '',
  };
  const categoryOptions = useCategories([...categoryList]);

  return (
    <Container textAlign="right">
      <Icon name="filter" />
        Filter by
      {' '}
      <Dropdown
        inline
        value={category}
        options={[defaultCategoryOption, ...categoryOptions]}
        onChange={(e, { value }) => history.push(`/${value}`)}
      />
      {' '}
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
  categoryList: PropTypes.arrayOf(PropTypes.object),
  currentOrder: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
    }),
  }),
  onChangeOrder: PropTypes.func.isRequired,
  orderList: dropdownType,
};

Header.defaultProps = {
  categoryList: [],
  match: { params: { category: '' } },
  orderList: [],
};

const mapStateToProps = ({
  categories: { list: categoryList },
  order: { currentOrder, list: orderList },
}) => ({
  categoryList,
  currentOrder,
  orderList,
});

const mapDispatchToProps = {
  onChangeOrder: setCurrentOrder,
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(ConnectedHeader);
