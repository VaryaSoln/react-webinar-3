import { memo } from 'react';
import './style.css';


function LoginForm({login, password, onLoginChange, onPasswordChange, error, onEnter}) {
    return (
        <div className="LoginForm">
            <h2>Вход</h2>
            <form className="LoginForm-Form">
                <div className="LoginForm-UserLogin">
                    <label for="login"> Логин:</label>
                    <input type="text" id="login" onChange={e=>onLoginChange(e.target.value)} value={login}></input>
                </div>
                <div className="LoginForm-Password">
                    <label for="password">Пароль:</label>
                    <input type="password" id="password" onChange={e=>onPasswordChange(e.target.value)} value={password}></input>
                </div>
            </form>
            <div className="LoginForm-Error">{error}</div>
            <button onClick={onEnter}>Войти</button>
        </div>

    );
};
export default memo(LoginForm);
