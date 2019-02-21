import { doRequest } from '.';

const getComments = postId => doRequest({
  url: `/posts/${postId}/comments`,
});

const updateComment = ({ body, id, timestamp }) => doRequest({
  body: { body, timestamp },
  method: 'PUT',
  url: `/comments/${id}`,
});

const removeComment = id => doRequest({
  method: 'DELETE',
  url: `/comments/${id}`,
});

const voteComment = option => id => doRequest({
  body: { option },
  method: 'POST',
  url: `/comments/${id}`,
});

const upVoteComment = voteComment('upVote');
const downVoteComment = voteComment('downVote');

export default {
  getComments,
  updateComment,
  removeComment,
  upVoteComment,
  downVoteComment,
};
