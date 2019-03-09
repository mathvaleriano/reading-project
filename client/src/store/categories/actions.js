import categoriesApi from '../../api/categories';
import {
  SET_CATEGORIES,
} from './types';

export const setCategories = (categories = []) => ({
  type: SET_CATEGORIES,
  payload: { list: categories },
});

export const getCategories = () => async (dispatch) => {
  const { categories } = await categoriesApi.getCategories();
  dispatch(setCategories(categories));
};
