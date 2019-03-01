import {
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY,
} from './types';
import initialState from './state';

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CATEGORIES:
    case SET_CURRENT_CATEGORY:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default reducer;
