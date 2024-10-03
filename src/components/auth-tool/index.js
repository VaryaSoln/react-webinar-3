import { memo } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';

function AuthTool({ isAuthorized, user }) {
    const navigate = useNavigate();

    return (
        <div className="AuthTool">
            {isAuthorized ? (
                <>
                    <Link className='AuthTool-User' to="/profile">{user}</Link>
                    <button onClick={() => { }}>Выход</button>
                </>
            ) : (
                <button onClick={() => { navigate("/login") }}>Вход</button>
            )
            }
        </div>
    );
};
export default memo(AuthTool);