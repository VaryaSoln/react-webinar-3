import { memo } from 'react';
import './style.css';


function User({name, phone, email}) {
    return (
        <>
            <div className="User">
                <h2>Профиль</h2>
                <div className="User-Name">Имя: <span className="User-Bold">{name}</span></div>
                <div className="User-Phone">Телефон: <span className="User-Bold">{phone}</span> </div>
                <div className="User-Email">email: <span className="User-Bold">{email}</span></div>
                
        
            </div>
        </>
    );
};
export default memo(User);
