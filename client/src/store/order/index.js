import initialState from './state';
import { SET_CURRENT_ORDER } from './types';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_ORDER:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
