import { memo } from 'react';
import './style.css';
import CommentTitle from '../comment-title';
import CommentEdit from '../comment-edit';

function Comment({user, commentDate, commentText, commentEdit, onAnswer  }) {
    return (
        <div className="Comment">
            <div className="Comment_wrapper">
                <div className="Comment_user"> {user}</div>
                <div className="Comment_data">{commentDate}</div>
            </div>
            <div className="Comment_text">
               {commentText}
            </div>
            <div className="Comment_answer" onClick={onAnswer}>Ответить</div>
            {commentEdit && (<CommentEdit answer={true}/>)}

        </div>
    );

}
export default memo(Comment);