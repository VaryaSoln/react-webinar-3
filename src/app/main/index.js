import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import LocaleSelect from '../../containers/locale-select';
import User from '../../components/user';
import AuthTool from '../../components/auth-tool';
import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();

  const callbacks = {
    onExit: useCallback(() => store.actions.auth.exit(), []),
  };
  const selector = useSelector(state => ({
    authorized: state.auth.authorized,
    user: state.auth.user,
  }));

  useInit(
    () => {
      store.actions.catalog.initParams();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthTool
        isAuthorized={selector.authorized}
        name={selector.user ? selector.user.profile.name : ""}
        onExit={callbacks.onExit}
      />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
