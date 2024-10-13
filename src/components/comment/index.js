import { memo } from 'react';
import './style.css';
import CommentEdit from '../comment-edit';
import CommentAuth from '../comment-auth';

function Comment({ user, authorized, commentDate, commentText, commentEdit, onAnswer, sessionExists, onSignIn, onCancel, level, onSend, parent, refs}) {
    return (
        <div className="Comment" style={{ marginLeft: level < 6 ? `${level * 30}px` : "150px" }}>
            <div className="Comment_wrapper">

                <div className={authorized ? "Comment_user Comment_user_auth" : "Comment_user"}> {user}</div>

                <div className="Comment_data">{commentDate}</div>
            </div>
            <div className="Comment_text">
                {commentText}
            </div>
            <div className="Comment_answer" onClick={onAnswer}>Ответить</div>
            {sessionExists ?
                (commentEdit && (<CommentEdit answer={true} onCancel={onCancel} onSend={onSend} parent={parent} refs={refs}/>)) :
                (commentEdit && (<CommentAuth answer={true} onSignIn={onSignIn} onCancel={onCancel} />))
            }
        </div>
    );

}
export default memo(Comment);