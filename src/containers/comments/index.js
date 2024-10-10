import { memo } from 'react';
import Comment from "../../components/comment";
import CommentEdit from "../../components/comment-edit";
import CommentTitle from '../../components/comment-title';
import CommentsLayout from '../../components/comments-layout';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';

function Comments() {

  const selector = useSelectorRedux(
    (state) => {
      return {
        count: state.comments.count,
        items: state.comments.items,
        newComment: state.comments.newComment,
      }
    },
    shallowequal,
  );

    console.log(selector.newComment);
  return (
    <CommentsLayout >
      <CommentTitle count={selector.count} />
      {selector.items.map((item) => {
        return (<Comment
          key={item._id}
          user={item.author._id}
          commentDate={item.dateCreate}
          commentText={item.text}
          commentEdit={item._id == selector.newComment}
        />)

      })}
      {selector.newComment === null ? (<CommentEdit answer={false} />):(<></>)}

    </CommentsLayout>
  );
}

export default memo(Comments);
