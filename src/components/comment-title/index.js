import { memo } from 'react';
import './style.css';

function CommentTitle( {count}) {
    return (
        <div className="CommentTitle">
            <div className="Comments-title"> { `Комментарии (${count})`}</div>
        </div>
    );

}
export default memo(CommentTitle);