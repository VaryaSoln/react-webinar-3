import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Card from '../components/card';



/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const select = useSelector(state => ({
    activeModal: state.modals.name,
    sum: state.basket.sum,
    amount: state.basket.amount,
  }));
  const store = useStore();
  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    goToBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <>
          <Main />
          {select.activeModal === 'basket' && <Basket />}
        </>
    },
    {
      path: "/cards/:cardId",
      element:
        <>
          <Card onAdd={callbacks.addToBasket} onOpen={callbacks.goToBasket} sum={select.sum} amount={select.amount} />,
          {select.activeModal === 'basket' && <Basket />}
        </>
    },

  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
