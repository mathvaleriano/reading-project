import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SUIComment, Icon } from 'semantic-ui-react';

const Comment = ({
  author,
  body,
  id,
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
        <SUIComment.Action>
          Score
          {' '}
          {voteScore}
        </SUIComment.Action>

        <SUIComment.Action>
          <Icon name="thumbs up outline" />
        </SUIComment.Action>

        <SUIComment.Action>
          <Icon name="thumbs down outline" />
        </SUIComment.Action>
      </SUIComment.Actions>
    </SUIComment.Content>
  </SUIComment>
);

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  voteScore: PropTypes.number,
};

Comment.defaultProps = {
  voteScore: 0,
};
