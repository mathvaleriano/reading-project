import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';
import { handleSetCurrentPost } from '../../store/posts/actions';
import { postType } from '../../types/post';

const PostDetails = lazy(
  () => import('../../components/PostDetails'),
);

const PostDetail = memo(({
  errors,
  match: { params: { postId } },
  post,
  onSetCurrentPost,
}) => {
  const hasErrors = (post && post.deleted) || errors.length > 0;

  useEffect(() => {
    onSetCurrentPost(postId);
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      { post && !post.deleted
        && <PostDetails post={post} />
      }
      { hasErrors
        && <Redirect to="/404" />
      }
    </Suspense>
  );
});

PostDetail.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  match: PropTypes.shape({
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }).isRequired,
  post: PropTypes.shape(postType),
  onSetCurrentPost: PropTypes.func.isRequired,
};

PostDetail.defaultProps = {
  errors: [],
  post: null,
};

const mapStateToProps = ({ posts: { currentPost, errors } }) => ({
  post: currentPost,
  errors,
});

const mapDispatchToProps = {
  onSetCurrentPost: handleSetCurrentPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
