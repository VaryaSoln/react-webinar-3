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
  const activeModal = useSelector(state => state.modals.name);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/cards/:cardId",
      element: <Card />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
