import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";

export default {
    /**
     * Загрузка комментариев
     * @param id
     * @return {Function}
     */
    load: id => {
      return async (dispatch, getState, services) => {
        // признак ожидания загрузки
        dispatch({ type: 'comments/load-start' });
  
        try {
          const res = await services.api.request({
            url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
          });
          
          // Комментарии загружены успешно
          dispatch({ type: 'comments/load-success', payload: { items: listToTree(res.data.result.items)[0].children, count: res.data.result.count } });
        } catch (e) {
          //Ошибка загрузки
          dispatch({ type: 'comments/load-error' });
        }
      };
    },
    answer: id =>{
      return { type: 'comments/answer', payload: { id } };
    },
    cancel: ()=>{
      return { type: 'comments/cancel' }
    },
  };