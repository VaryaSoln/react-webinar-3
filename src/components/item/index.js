import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatPrice, plural } from '../../utils';
import './style.css';

function Item({ item, onAddItemToBasket, onDeleteItemFromBasket, inCatalog }) {
  console.log("Item");
  const callbacks = {
    onAdd: () => {
      onAddItemToBasket(item.code);
    },
    onDelete: () => {
      onDeleteItemFromBasket(item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">
        {item.title}
      </div>
      <div className="Item-price">
        {formatPrice(item.price)}
      </div>
      {inCatalog ? ("") : (<div className="Item-quant">
        {`${item.count} шт`}
      </div>)}

      <div className="Item-actions">
        {inCatalog ? (<button onClick={callbacks.onAdd}>Добавить</button>) : (<button onClick={callbacks.onDelete}>Удалить</button>)}

      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};


export default React.memo(Item);
