import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';
import List from '../list';
import { formatPrice} from '../../utils';

function Basket({ basket, sum, onDeleteItemFromBasket, onCloseBasket }) {
    console.log("Basket");
    return (

        <div className="Basket" >
            <Head title="Корзина" inCatalog={false} onCloseBasket={onCloseBasket} />
            <div className="Basket-space"></div>
            <List list={basket} onAddItemToBasket={() => { }} onDeleteItemFromBasket={onDeleteItemFromBasket} inCatalog={false} />
            <div className="Basket-total">
                <div className="Basket-totalText">Итого</div>
                <div className="Basket-totalSum">{formatPrice(sum)}</div>
            </div>
        </div>

    );
}


export default React.memo(Basket);