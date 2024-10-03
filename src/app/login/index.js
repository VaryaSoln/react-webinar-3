import { memo, useCallback, useState } from 'react';
import LoginForm from '../../components/login-form';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import AuthTool from '../../components/auth-tool';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function Login() {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const selector = useSelector(state => ({
    error: state.auth.error,
    authorized: state.auth.authorized,
    user: state.auth.user,
  }));

  const store = useStore();

  const callbacks = {
    onLoginChange: useCallback((login) => setLogin(login), []),
    onPasswordChange: useCallback((password) => setPassword(password), []),
    onEnter: useCallback(() => store.actions.auth.authorize(login, password), [login, password]),
    onExit: useCallback(() => store.actions.auth.exit(), []),
  };

  return (
    <PageLayout>
      <AuthTool
        isAuthorized={selector.authorized}
        name={selector.user ? selector.user.profile.name : ""}
        onExit={callbacks.onExit}
      />
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm
        login={login}
        password={password}
        onLoginChange={callbacks.onLoginChange}
        onPasswordChange={callbacks.onPasswordChange}
        error={selector.error}
        onEnter={callbacks.onEnter}
      />
    </PageLayout>
  );
}

export default memo(Login);
