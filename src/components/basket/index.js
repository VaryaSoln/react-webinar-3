import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';
import List from '../list';

function Basket({ basket, sum, onDeleteItemFromBasket, isVisible, onCloseBasket }) {
    console.log("Basket");
    return (
        <div className={isVisible ? "Basket-container Basket-container_visible" : "Basket-container "}>
            <div className="Basket" >
                <Head title="Корзина" inCatalog={false} onCloseBasket={onCloseBasket} />
                <List list={basket} onAddItemToBasket={() => { }} onDeleteItemFromBasket={onDeleteItemFromBasket} inCatalog={false} />
                <div className="Basket-total">
                    <div className="Basket-totalText">Итого</div>
                    <div className="Basket-totalSum">{`${sum} ₽`}</div>
                </div>
            </div>
        </div>
    );
}


export default React.memo(Basket);