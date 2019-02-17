import { doRequest } from '.';

export const getComments = postId => doRequest({
  url: `/posts/${postId}/comments`,
});

export const updateComment = ({ body, id }) => doRequest({
  body: { body },
  method: 'PUT',
  url: `/comments/${id}`,
});

export const removeComment = id => doRequest({
  method: 'DELETE',
  url: `/comments/${id}`,
});

const voteComment = option => id => doRequest({
  body: { option },
  method: 'POST',
  url: `/comments/${id}`,
});

export const upVoteComment = voteComment('upVote');
export const downVoteComment = voteComment('downVote');

export default {
  getComments,
  updateComment,
  removeComment,
  upVoteComment,
  downVoteComment,
};
