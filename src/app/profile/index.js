import { memo, useEffect } from 'react';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import User from '../../components/user';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import AuthToolContainer from '../../containers/auth-tool-container';

function Profile() {

  const store= useStore();

  const selector = useSelector(state => ({
    name: state.profile.user.profile.name,
    phone: state.profile.user.profile.phone,
    email: state.profile.user.email,
  }));

  useEffect(()=>{
    store.actions.profile.load();
  });

  return (
    <PageLayout>
     <AuthToolContainer />
      <Head title="Магазин">
        <LocaleSelect />
      </Head>
      <Navigation />
      {selector.name !== "" ?
        (<User name={selector.name} phone={selector.phone} email={selector.email} />)
        : (<></>)}
    </PageLayout>
  );
}

export default memo(Profile);
