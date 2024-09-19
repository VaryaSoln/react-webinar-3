import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({ title, inCatalog, onCloseBasket }) {
  console.log("Head");
  const callbacks = {
    onCloseBasket: () => {
      onCloseBasket();
    }
  }
  return (
    <div className="Head">
      <h1>{title}</h1>
      <div className="Head-actions">
        {inCatalog ? ("") : (<button onClick={callbacks.onCloseBasket}>Закрыть</button>)}
      </div>
    </div>

  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
