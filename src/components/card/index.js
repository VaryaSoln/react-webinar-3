import { useEffect, useState } from 'react';
import './style.css';
import BasketTool from '../basket-tool';


function Card({_id}) {
    console.log("Рендерим Card");
    const [data, setData] = useState({});
    console.log(`что лежит в data.description: ${data.description}`)
    useEffect(() => {
        load();
    }, []);

    async function load() {
        console.log("Загружаем данные с сервера");
        const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
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
   
    return (
        <div className="Card">
            <div className="Card-head">
                <h1 className="Card-title">{data.title}</h1>
            </div>
            <div className="Card-controls">
                <div className="Card-controls-link">Главная</div>
                <BasketTool />
            </div>
            <div className="Card-inform">
                <div className="Card-inform-content">{data.description}</div>
                <div className="Card-inform-madeIn">Страна производитель: {data.madeIn}</div>
                <div className="Card-inform-category">Категория: {data.category}</div>
                <div className="Card-inform-year">Год выпуска: {data.year}</div>
                <div className="Card-inform-price">Цена: {data.price}</div>

                <button onClick>Добавить</button>
            </div>
        </div>
    );
}

export default Card;
