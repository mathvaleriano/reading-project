import { doRequest } from '.';

const getCategories = () => doRequest({
  url: '/categories',
});

export default {
  getCategories,
};
