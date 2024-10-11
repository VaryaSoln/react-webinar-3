import { memo, useCallback } from 'react';
import Comment from "../../components/comment";
import CommentEdit from "../../components/comment-edit";
import CommentTitle from '../../components/comment-title';
import CommentsLayout from '../../components/comments-layout';
import { useSelector as useSelectorRedux } from 'react-redux';
import shallowequal from 'shallowequal';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import formatTime from '../../utils/time';
import CommentAuth from '../../components/comment-auth';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import treeToList from '../../utils/tree-to-list';
import useServices from '../../hooks/use-services';

function Comments() {
  const navigate= useNavigate();
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

  const storeSelector = useSelector(state => ({
    exists: state.session.exists,
  }));

  const dispatch = useDispatch();

  const services = useServices();

  const callbacks = {
    onAnswer: (id) => { dispatch(commentsActions.answer(id)) },

    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    //Отмена
    onCancel: ()=>{
      dispatch(commentsActions.cancel());
    },

    onSend: async (text, parent)=>{
      const res = await services.api.request({
        url: `/api/v1/comments`,
        method: "POST",
        headers:{},
        body: JSON.stringify({
          "text": text,
          "parent": {"_id":  parent, "_type":  "comment"}
        })

      });
      dispatch(commentsActions.cancel())
    }

  };
  return (
    <CommentsLayout >
      <CommentTitle count={selector.count} />
      {treeToList(selector.items, (item, level)=>{item.level=level; return item}).map((item) => {
        return (<Comment
          key={item._id}
          user={item.author.profile.name}
          commentDate={formatTime(item.dateCreate)}
          commentText={item.text}
          commentEdit={item._id == selector.newComment}
          onAnswer={() => { callbacks.onAnswer(item._id) }}
          sessionExists={storeSelector.exists}
          onSignIn={callbacks.onSignIn}
          onCancel={callbacks.onCancel}
          level={item.level}
          onSend={callbacks.onSend}
          parent={item.parent._id}
        />)

      })}
      {storeSelector.exists ?
        (selector.newComment === null ? (<CommentEdit answer={false} onCancel={callbacks.onCancel} onSend={callbacks.onSend}/>) : (<></>)) :
        (selector.newComment === null ? (<CommentAuth answer={false} onSignIn={callbacks.onSignIn} onCancel={callbacks.onCancel}/>) : (<></>))
      }
     
    </CommentsLayout>
  );
}

export default memo(Comments);
