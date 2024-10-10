// Начальное состояние
export const initialState = {
  items: [],
  count: 0,
  newComment: "6707b55e87affd425bb45422",
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, comments: {}, waiting: true };

    case 'comments/load-success':
      return { ...state, items: action.payload.items, count: action.payload.count, waiting: false };

    case 'comments/load-error':
      return { ...state, comments: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
