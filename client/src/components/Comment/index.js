import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment as SUIComment, Icon } from 'semantic-ui-react';
import {
  handleUpVote,
  handleDownVote,
} from '../../store/comments/actions';

const Comment = memo(({
  author,
  body,
  id,
  onClickDownVote,
  onClickUpVote,
  timestamp,
  voteScore = 0,
}) => (
  <SUIComment key={id}>
    <SUIComment.Content>
      <SUIComment.Author as="a">{author}</SUIComment.Author>

      <SUIComment.Metadata>
        <div>{new Date(timestamp).toLocaleString()}</div>
      </SUIComment.Metadata>

      <SUIComment.Text>{body}</SUIComment.Text>

      <SUIComment.Actions>
        <SUIComment.Action onClick={() => onClickUpVote(id)}>
          <Icon name="thumbs up outline" />
        </SUIComment.Action>

        <SUIComment.Action onClick={() => onClickDownVote(id)}>
          <Icon name="thumbs down outline" />
        </SUIComment.Action>

        <SUIComment.Action>
          Vote Score:
          {' '}
          {voteScore}
        </SUIComment.Action>
      </SUIComment.Actions>
    </SUIComment.Content>
  </SUIComment>
));

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  onClickDownVote: PropTypes.func.isRequired,
  onClickUpVote: PropTypes.func.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number,
};

Comment.defaultProps = {
  voteScore: 0,
};

const mapDispatchToProps = {
  onClickDownVote: handleDownVote,
  onClickUpVote: handleUpVote,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Comment);
