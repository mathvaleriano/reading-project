import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Feed, TextArea } from 'semantic-ui-react';
import Summary from './Summary';
import Meta from './Meta';
import Form from '../Form';
import {
  handleUpdatePost,
} from '../../store/posts/actions';
import { postType } from '../../types/post';
import useIsEditing from '../../hooks/useIsEditing';

const Post = memo(({
  onClickComments,
  onUpdatePost,
  post,
}) => {
  const { isEditing, toggleIsEditing } = useIsEditing();

  const handleSubmit = ({ body, title }) => {
    toggleIsEditing();
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
            post={post}
          />

          <Feed.Extra text>
            { isEditing
              ? (
                <TextArea
                  required
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
            toggleIsEditing={toggleIsEditing}
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
  post: PropTypes.shape(postType).isRequired,
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
