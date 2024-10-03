import { memo, useCallback, useState } from 'react';
import LoginForm from '../../components/login-form';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import AuthTool from '../../components/auth-tool';
import User from '../../components/user';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function Profile() {

  const store= useStore();
  const callbacks = {
    onExit: useCallback(() => store.actions.auth.exit(), []),
  };

  const selector = useSelector(state => ({
    authorized: state.auth.authorized,
    user: state.auth.user,
  }));

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
      {selector.user ?
        (<User name={selector.user.profile.name} phone={selector.user.profile.phone} email={selector.user.email} />)
        : (<></>)}
    </PageLayout>
  );
}

export default memo(Profile);
