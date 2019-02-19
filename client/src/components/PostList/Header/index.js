import React from 'react';
import { Container, Dropdown, Icon } from 'semantic-ui-react';

const orders = [
  { key: 'timestamp', value: 'timestamp', text: 'Timestamp' },
  { key: 'commentCount', value: 'commentCount', text: 'With more comments' },
];

const Header = () => (
  <Container textAlign="right">
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

export default Header;
