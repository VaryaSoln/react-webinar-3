import { memo, useCallback, useState } from 'react';
import LoginForm from '../../components/login-form';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import AuthTool from '../../components/auth-tool';
import User from '../../components/user';

function Profile() {
 
  /* const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Текст ошибки от сервера");

  const callbacks = {
    onLoginChange: useCallback((login)=>setLogin(login), []),
    onPasswordChange: useCallback((password)=>setPassword(password), []),
    onEnter: useCallback(()=>{}, []),
  }; */

  return (
    <PageLayout>
      <AuthTool isAuthorized={true} user="User №1"/>
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      <User name="User №1" phone="+70000000001" email="test_50@example.com"/>
    </PageLayout>
  );
}

export default memo(Profile);
