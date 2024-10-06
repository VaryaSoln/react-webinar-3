import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import Profile from './profile';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const selector = useSelector(state => ({
    modals: state.modals.name,
    authorized: state.auth.authorized,
  }));

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        {selector.authorized ? (<Route path={'/login'} element={<Navigate to="/" />} />):(<Route path={'/login'} element={<Login />} />)}
        {selector.authorized ? (<Route path={'/profile'} element={<Profile />} />):(<Route path={'/profile'} element={<Navigate to="/login" />} />)}

      </Routes>

      {selector.modals === 'basket' && <Basket />}
    </>
  );
}

export default App;
