import { memo } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

function AuthTool({ isAuthorized, name, onExit }) {
    const navigate = useNavigate();

    return (
        <div className="AuthTool">
            {isAuthorized ? (
                <>
                    <Link className='AuthTool-User' to="/profile">{name}</Link>
                    <button onClick={onExit}>Выход</button>
                </>
            ) : (
                <button onClick={() => { navigate("/login") }}>Вход</button>
            )
            }
        </div>
    );
};
export default memo(AuthTool);