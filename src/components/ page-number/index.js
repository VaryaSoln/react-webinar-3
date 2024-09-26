import { memo } from 'react';
import './style.css';

function PageNumber({ currentPage, maxPage, onPage }) {
    return (
        <div className="PageNumder">
            <div className="PageNumder-Container">
                {currentPage > 1 && <div className="PageNumder-Number " onClick={()=>onPage(1)}>1</div>}
                {currentPage > 3 && <div className="PageNumder-Dots">...</div>}
                {currentPage > 2 && <div className="PageNumder-Number" onClick={()=>onPage(Number(currentPage) - 1)}>{Number(currentPage) - 1}</div>}
                <div className="PageNumder-Number PageNumder-Number_Color" onClick={()=>onPage(currentPage)}>{currentPage}</div>
                {maxPage - currentPage > 1 && <div className="PageNumder-Number" onClick={()=>onPage(Number(currentPage) + 1)}>{Number(currentPage) + 1}</div>}
                {maxPage - currentPage > 2 && <div className="PageNumder-Dots">...</div>}
                {maxPage - currentPage > 0 && <div className="PageNumder-Number" onClick={()=>onPage(maxPage)}>{maxPage}</div>}
            </div>

        </div>
    );
}

export default memo(PageNumber);