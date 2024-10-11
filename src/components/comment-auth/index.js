import { memo } from 'react';
import './style.css';

function CommentAuth({ answer, onSignIn, onCancel }) {
    return (
        <div className="CommentAuth" >
            <span className="CommentAuth_Enter" onClick={onSignIn}>Войдите</span>, чтобы иметь возможность ответить. {answer ? <span className="CommentAuth_Cancel" onClick={onCancel}>Отмена</span> : ""}
        </div>
    )
}
export default memo(CommentAuth);