import { doRequest } from '.';

export const getPosts = () => doRequest({ url: '/posts' });

export default {
  getPosts,
};
