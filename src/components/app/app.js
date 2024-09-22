import React, { useCallback } from 'react';
import List from '../list';
import Controls from '../controls';
import Head from '../head';
import PageLayout from '../page-layout';
import Basket from '../basket';
import ModalPageLayout from '../modal-page-layout';
import './style.css';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  console.log("App");
  const list = store.getState().list;
  const basket = store.getState().basket;

  const callbacks = {
    onAddItemToBasket: (code) => {
      store.addItemToBasket(code);
    },
    onDeleteItemFromBasket: (code) => {
      store.deleteItemFromBasket(code);
    },
    onGoToBasket: () => {
      store.changeBasketVisibility(true);
    },
    onCloseBasket: () => {
      store.changeBasketVisibility(false);
    }
  };

  return (
    <>
      <PageLayout>
        <Head title="Магазин" inCatalog={true} />
        <Controls
          quantity={store.getState().basketQuantity}
          sum={store.getState().basketSum}
          onGoToBasket={callbacks.onGoToBasket}
        />
        <List
          list={list}
          onAddItemToBasket={callbacks.onAddItemToBasket}
          inCatalog={true}
        />
      </PageLayout>
      <ModalPageLayout visible={store.getState().isBasketVisible} >
        <Basket
          basket={basket}
          sum={store.getState().basketSum}
          onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket}
          onCloseBasket={callbacks.onCloseBasket}
        />
      </ModalPageLayout>
    </>
  );
}

export default App;
