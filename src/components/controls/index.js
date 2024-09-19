import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';


function Controls({ quantity, sum, onGoToBasket }) {
  console.log("Controls");
  const callbacks ={
    onGo: ()=>{onGoToBasket()},
  }
  return (

    <div className="Controls">
      <div className="Controls-title">
        {quantity === 0 ? "В корзине: пусто" : `В корзине: ${quantity} ${plural(quantity, { one: 'товар', few: 'товара', many: 'товаров' })} / ${sum} ₽`}
      </div>
      <button onClick={callbacks.onGo}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {

};

Controls.defaultProps = {

};

export default React.memo(Controls);
