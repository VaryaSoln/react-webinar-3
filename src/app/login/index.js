import { memo, useCallback, useState } from 'react';
import LoginForm from '../../components/login-form';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import AuthTool from '../../components/auth-tool';
function Login() {
 
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Текст ошибки от сервера");

  const callbacks = {
    onLoginChange: useCallback((login)=>setLogin(login), []),
    onPasswordChange: useCallback((password)=>setPassword(password), []),
    onEnter: useCallback(()=>{}, []),
  };

  return (
    <PageLayout>
      <AuthTool isAuthorized={true} user="Varya"/>
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        login={login}
        password={password}
        onLoginChange={callbacks.onLoginChange}
        onPasswordChange={callbacks.onPasswordChange}
        error={error}
        onEnter={callbacks.onEnter}
      />
    </PageLayout>
  );
}

export default memo(Login);
