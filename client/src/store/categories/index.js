import {
  SET_CATEGORIES,
} from './types';
import initialState from './state';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
