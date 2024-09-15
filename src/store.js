/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.nextCode = this.getMax() + 1;
    this.state.list.forEach((item) => { item.count = 0 });
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [...this.state.list, { code: this.state.nextCode, title: 'Новая запись', count: 0 }],
      nextCode: this.state.nextCode + 1, //Задание 2, в этом свойстве храним код следующей новой записи
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;

          if (item.selected === true) {
            this.updateCount(item.code);
          }
        } else {
          //Задание 1, снимаем выделение с остальных записей
          item.selected = false;

        }
        return item;
      }),
    });
  }

  /**
     * Увеличить счетчик на 1 (Задание 3)
     * @param code
     */
  updateCount(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.count += 1;
        }
        return item;
      }),
    });
  }

    /**
     * Возвращает максимальное значение code;
     */
    getMax() {
      let max = 0;
      this.state.list.forEach((item)=>{
        if (item.code > max){
          max = item.code;
        }
      })
      return max;
    };

  }






export default Store;
