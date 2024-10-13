import { memo, useState } from 'react';
import './style.css';
import CommentTitle from '../comment-title';

function CommentEdit({ answer, onCancel, onSend, parent, refs }) {
    const [text, setText] = useState("");
    return (
        <div className="CommentEdit" ref={refs}>
            <div className="CommentEdit_newComment">{answer ? "Новый ответ" : "Новый комментарий"}</div>
            <textarea className="CommentEdit_input" onChange={(e) => { setText(e.target.value) }} >{text}</textarea>
            <div className="CommentEdit_buttonWrapper">
                <button className="CommentEdit_button" onClick={() => { if (text.trim()!=="") { onSend(text, parent) } }}>Отправить</button>
                {answer && <button className="CommentEdit_buttonCancel" onClick={onCancel}>Отмена</button>}
            </div>
        </div>
    );

}
export default memo(CommentEdit);