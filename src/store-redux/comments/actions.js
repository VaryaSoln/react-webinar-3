export default {
    /**
     * Загрузка комментариев
     * @param id
     * @return {Function}
     */
    load: id => {
      return async (dispatch, getState, services) => {
        // Сброс текущего товара и установка признака ожидания загрузки
        dispatch({ type: 'comments/load-start' });
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
          });
          // Товар загружен успешно
          console.log(`Варя: комменты с сервера`);
          console.log(res);
          dispatch({ type: 'comments/load-success', payload: { items: res.data.result.items, count: res.data.result.count } });
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: 'comments/load-error' });
        }
      };
    },
  };