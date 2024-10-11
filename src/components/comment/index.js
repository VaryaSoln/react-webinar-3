import { memo } from 'react';
import './style.css';
import CommentEdit from '../comment-edit';
import CommentAuth from '../comment-auth';

function Comment({ user, commentDate, commentText, commentEdit, onAnswer, sessionExists, onSignIn, onCancel, level, onSend, parent }) {
    return (
        <div className="Comment" style={{marginLeft:`${level*30}px`}}>
            <div className="Comment_wrapper">
                <div className="Comment_user"> {user}</div>
                <div className="Comment_data">{commentDate}</div>
            </div>
            <div className="Comment_text">
                {commentText}
            </div>
            <div className="Comment_answer" onClick={onAnswer}>Ответить</div>
            {sessionExists ?
                (commentEdit && (<CommentEdit answer={true} onCancel={onCancel} onSend={onSend} parent={parent}/>)) :
                (commentEdit && (<CommentAuth answer={true} onSignIn={onSignIn} onCancel={onCancel}/>))
            }
        </div>
    );

}
export default memo(Comment);