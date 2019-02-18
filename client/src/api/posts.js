import { doRequest } from '.';

const getPosts = (id = '') => doRequest({ url: `/posts/${id}` });

const getPostsByCategory = category => doRequest({
  url: `/${category}/posts`,
});

const addPost = post => doRequest({
  body: post,
  method: 'POST',
  url: '/posts',
});

const updatePost = ({ body, id, title } = {}) => doRequest({
  body: { body, title },
  method: 'PUT',
  url: `/posts/${id}`,
});

const removePost = id => doRequest({
  url: `/posts/${id}`,
  method: 'DELETE',
});

const votePost = option => id => doRequest({
  body: { option },
  method: 'POST',
  url: `/posts/${id}`,
});

const upVotePost = votePost('upVote');

const downVotePost = votePost('downVote');

export default {
  addPost,
  getPosts,
  getPostsByCategory,
  updatePost,
  removePost,
  upVotePost,
  downVotePost,
};
