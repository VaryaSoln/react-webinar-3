import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Basket from './components/basket';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const basket = store.getState().basket;

  const callbacks = {
    onAddItemToBasket: (code)=>{
      store.addItemToBasket(code);
    },
    onDeleteItemFromBasket: (code)=>{
      store.deleteItemFromBasket(code);
    },
    onGoToBasket: ()=>{
      store.changeBasketVisibility(true);
    },
    onCloseBasket: ()=>{
      store.changeBasketVisibility(false);
    }
  };

  return (
    <PageLayout>
      <Head title="Магазин" inCatalog={true}/>
      <Controls quantity={store.calcOrderQuantity()} sum={store.calcOrderSum()} onGoToBasket={callbacks.onGoToBasket}/>
      <List list={list} onAddItemToBasket={callbacks.onAddItemToBasket} inCatalog={true} />
      <Basket basket={basket} sum={store.calcOrderSum()} onDeleteItemFromBasket={callbacks.onDeleteItemFromBasket} isVisible={store.state.isBasketVisible} onCloseBasket={callbacks.onCloseBasket}/>
    </PageLayout>
  );
}

export default App;
