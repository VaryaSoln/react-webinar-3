import { memo } from 'react';
import './style.css';

function PageNumber({ currentPage, maxPage, onPage }) {
    return (
        <div className="PageNumder">
            <div className="PageNumder-Container">
                {currentPage > 1 && <div className="PageNumder-Number " onClick={() => onPage(1)}>1</div>}
                {((currentPage !== maxPage && currentPage > 3) || (currentPage == maxPage && maxPage > 4)) && <div className="PageNumder-Dots">...</div>}

                {currentPage === maxPage && maxPage > 3 && <div className="PageNumder-Number" onClick={() => onPage(Number(currentPage) - 2)}>{Number(currentPage) - 2}</div>}

                {currentPage > 2 && <div className="PageNumder-Number" onClick={() => onPage(Number(currentPage) - 1)}>{Number(currentPage) - 1}</div>}
                <div className="PageNumder-Number PageNumder-Number_Color" onClick={() => onPage(currentPage)}>{currentPage}</div>
                {maxPage - currentPage > 1 && <div className="PageNumder-Number" onClick={() => onPage(Number(currentPage) + 1)}>{Number(currentPage) + 1}</div>}

                {currentPage === 1 && maxPage > 3 && <div className="PageNumder-Number" onClick={() => onPage(Number(currentPage) + 2)}>{Number(currentPage) + 2}</div>}

                {((maxPage - currentPage > 2 && currentPage !== 1) || (currentPage == 1 && maxPage - currentPage > 3)) && <div className="PageNumder-Dots">...</div>}
                {maxPage - currentPage > 0 && <div className="PageNumder-Number" onClick={() => onPage(maxPage)}>{maxPage}</div>}
            </div>

        </div>
    );
}

export default memo(PageNumber);