const orderList = [
  { key: 'timestamp', value: 'timestamp', text: 'latest' },
  { key: 'commentCount', value: 'commentCount', text: 'more commented' },
];

const currentOrder = orderList[0].value;

const initialState = {
  list: orderList,
  currentOrder,
};

export default initialState;
