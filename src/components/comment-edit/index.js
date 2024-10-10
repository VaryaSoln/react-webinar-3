import { memo } from 'react';
import './style.css';
import CommentTitle from '../comment-title';

function CommentEdit({ answer }) {
    return (
        <div className="CommentEdit">
            <div className="CommentEdit_newComment">{answer ? "Новый ответ" : "Новый комментарий"}</div>
            <textarea className="CommentEdit_input" ></textarea>
            <div className="CommentEdit_buttonWrapper">
                <button className="CommentEdit_button">Отправить</button>
                {answer && <button className="CommentEdit_buttonCancel">Отмена</button>}
            </div>
        </div>
    );

}
export default memo(CommentEdit);