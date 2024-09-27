import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './style.css';
import BasketTool from '../basket-tool';
import useStore from '../../store/use-store';


function Card({onAdd, sum, amount, onOpen}) {
    const [data, setData] = useState({});
    const params = useParams();
    console.log("Ренденим Card");
    useEffect(() => {
        load();
    },[params]);

    async function load() {
        console.log("Загружаем данные с сервера");
        const response = await fetch(`/api/v1/articles/${params.cardId}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        console.log(json);
        setData({
            title: json.result.title,
            description: json.result.description,
            madeIn: json.result.madeIn.title,
            category: json.result.category.title,
            year: json.result.edition,
            price: json.result.price,
        });
    };
    const callbacks = {
        onAdd: e => onAdd(params.cardId),
      };
  
    return (
        <div className="Card">
            <div className="Card-head">
                <h1 className="Card-title">{data.title}</h1>
            </div>
            <div className="Card-controls">
                <div className="Card-controls-link"><Link to={`/`}>Главная</Link></div>
                <BasketTool sum={sum} amount={amount} onOpen={onOpen}/>
            </div>
            <div className="Card-inform">
                <div className="Card-inform-content">{data.description}</div>
                <div className="Card-inform-madeIn">Страна производитель: {data.madeIn}</div>
                <div className="Card-inform-category">Категория: {data.category}</div>
                <div className="Card-inform-year">Год выпуска: {data.year}</div>
                <div className="Card-inform-price">Цена: {data.price}</div>

                <button onClick={callbacks.onAdd}>Добавить</button>
            </div>
        </div>
    );
    }


export default Card;
