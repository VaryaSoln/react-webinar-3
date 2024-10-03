import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const [categoryList, setCategoryList] = useState([]);

  async function load() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    const categories =  json.result.items.map((item) => {
      return { value: item._id, title: item.title };
    });
    categories.unshift({value: "all", title: "Все"});
    setCategoryList(categories);
  };
  useEffect(() => { load() }, []);

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => { console.log(sort); store.actions.catalog.setParams({ sort }) }, [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Категория
    onCategory: useCallback(category => store.actions.catalog.setParams({ category }), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    /* category: useMemo(
      () => [
        { value: 'category1', title: 'Все' },
        { value: 'category2', title: 'Электроника' },
        { value: 'category3', title: 'Телефоны' },
        { value: 'category4', title: 'Компьютеры' },
      ],
      [],
    ), */
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select options={categoryList} value={select.category} onChange={callbacks.onCategory} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
