const orderList = [
  { key: 'timestamp', value: 'timestamp', text: 'Timestamp' },
  { key: 'commentCount', value: 'commentCount', text: 'With more comments' },
];

const currentOrder = orderList[0].value;

const initialState = {
  list: orderList,
  currentOrder,
};

export default initialState;
