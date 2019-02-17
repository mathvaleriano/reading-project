import { doRequest } from '.';

export const getPosts = (id = '') => doRequest({ url: `/posts/${id}` });

export const getPostsByCategory = category => doRequest({
  url: `/${category}/posts`,
});

export const addPost = post => doRequest({
  body: post,
  method: 'POST',
  url: '/posts',
});

export const updatePost = ({ body, id, title } = {}) => doRequest({
  body: { body, title },
  method: 'PUT',
  url: `/posts/${id}`,
});

export const removePost = id => doRequest({
  url: `/posts/${id}`,
  method: 'DELETE',
});

const votePost = option => id => doRequest({
  body: { option },
  method: 'POST',
  url: `/posts/${id}`,
});

export const upVotePost = votePost('upVote');

export const downVotePost = votePost('downVote');

export default {
  addPost,
  getPosts,
  getPostsByCategory,
  updatePost,
  removePost,
  upVotePost,
  downVotePost,
};
