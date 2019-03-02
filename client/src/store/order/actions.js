import { SET_CURRENT_ORDER } from './types';

export const setCurrentOrder = currentOrder => ({
  type: SET_CURRENT_ORDER,
  payload: { currentOrder },
});

export default {
  setCurrentOrder,
};
