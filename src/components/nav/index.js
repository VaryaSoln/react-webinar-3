import { Link } from 'react-router-dom';
import './style.css';
function Nav (){
    return (
        <div className="Card-controls-link"><Link to={`/`}>Главная</Link></div>
    )
}
export default Nav;