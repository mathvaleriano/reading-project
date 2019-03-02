import categoriesApi from '../../api/categories';
import {
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY,
} from './types';

export const setCategories = (categories = []) => ({
  type: SET_CATEGORIES,
  payload: { list: categories },
});

export const setCurrentCategory = currentCategory => ({
  type: SET_CURRENT_CATEGORY,
  payload: { currentCategory },
});

export const getCategories = () => async (dispatch) => {
  const { categories } = await categoriesApi.getCategories();
  dispatch(setCategories(categories));
  dispatch(setCurrentCategory(categories[0].path));
};
