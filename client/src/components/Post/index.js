import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Feed, TextArea } from 'semantic-ui-react';
import Summary from './Summary';
import Meta from './Meta';
import Form from '../Form';
import {
  handleUpdatePost,
} from '../../store/posts/actions';

const Post = memo(({
  onClickComments,
  onUpdatePost,
  post,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = ({ body, title }) => {
    setIsEditing(false);
    return onUpdatePost({ body, post, title });
  };

  return (
    <Feed.Event>
      <Feed.Content>
        <Form
          hasCustomSubmit
          onSubmit={handleSubmit}
        >
          <Summary
            isEditing={isEditing}
            {...post}
          />

          <Feed.Extra text>
            { isEditing
              ? (
                <TextArea
                  name="body"
                  placeholder="Type a new description..."
                  defaultValue={post.body}
                />
              )
              : post.body
          }
          </Feed.Extra>

          <Meta
            isEditing={isEditing}
            onClickComments={onClickComments}
            toggleIsEditing={() => setIsEditing(!isEditing)}
            {...post}
          />
        </Form>
      </Feed.Content>
    </Feed.Event>
  );
});

Post.propTypes = {
  onClickComments: PropTypes.func,
  onUpdatePost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    commentCount: PropTypes.number,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

Post.defaultProps = {
  onClickComments: () => {},
};

const mapDispatchToProps = {
  onUpdatePost: handleUpdatePost,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Post);
