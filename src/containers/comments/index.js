import { memo } from 'react';
import Comment from "../../components/comment";
import CommentEdit from "../../components/comment-edit";
import CommentTitle from '../../components/comment-title';
import CommentsLayout from '../../components/comments-layout';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';

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

  const dispatch = useDispatch();
  const callbacks = {
    onAnswer: (id) => { dispatch(commentsActions.answer(id)) },
  }

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
          onAnswer={() => { callbacks.onAnswer(item._id) }}
        />)

      })}
      {selector.newComment === null ? (<CommentEdit answer={false} />) : (<></>)}

    </CommentsLayout>
  );
}

export default memo(Comments);
