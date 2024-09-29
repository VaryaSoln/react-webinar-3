import { Link } from 'react-router-dom';
import './style.css';
import BasketTool from '../basket-tool';
import Nav from '../nav';



function Card({ onAdd, sum, amount, onOpen, data }) {

    return (
        <div className="Card">
            <div className="Card-head">
                <h1 className="Card-title">{data.title}</h1>
            </div>
            <div className="Card-controls">
                {/* <div className="Card-controls-link"><Link to={`/`}>Главная</Link></div> */}
                <Nav />
                <BasketTool sum={sum} amount={amount} onOpen={onOpen} />
            </div>
            <div className="Card-inform">
                <div className="Card-inform-content">{data.description}</div>
                <div className="Card-inform-madeIn">Страна производитель: {data.madeIn}</div>
                <div className="Card-inform-category">Категория: {data.category}</div>
                <div className="Card-inform-year">Год выпуска: {data.year}</div>
                <div className="Card-inform-price">Цена: {data.price}</div>
                <button onClick={()=>onAdd(data.product)}>Добавить</button>
            </div>
        </div>
    );
}


export default Card;
