import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.state.basket = []; //Корзина
    this.state.isBasketVisible = false; //видимость корзины
    this.state.basketSum = 0; //сумма заказа в корзине
    this.state.basketQuantity = 0; //количество товаров в корзине
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
      list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
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
          // Смена выделения и подсчёт
          return {
            ...item,
            selected: !item.selected,
            count: item.selected ? item.count : item.count + 1 || 1,
          };
        }
        // Сброс выделения если выделена
        return item.selected ? { ...item, selected: false } : item;
      }),
    });
  }
  /**
   * Добавление товара в корзину
   * @param code
   */
  addItemToBasket(code) {
    const item = this.state.list.filter((item) => { return item.code === code })[0];//получает item
    let isPresent = false;
    this.state.basket.forEach((item) => {
      if (item.code === code) {
        isPresent = true;
      }
    });

    if (isPresent === false) {
      //добавить товар в корзину
      this.setState({
        ...this.state,
        basket: [...this.state.basket, { ...item, count: 1 }],
      });

    } else {
      //увеличить количество на 1 
      this.setState({
        ...this.state,
        basket: this.state.basket.map((item) => {
          if (item.code === code) {
            return { ...item, count: ++item.count }
          } else {
            return item;
          }
        }),
      });
    }
    this.calcOrderSum();
    this.calcOrderQuantity();
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteItemFromBasket(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter((item) => {
        return item.code !== code;
      }),
    });
    this.calcOrderSum();
    this.calcOrderQuantity();
  }
  /**
     * Подсчет суммы заказа
     * @returns Number
     */
  calcOrderSum() {
    let orderSum = 0;
    this.state.basket.forEach((item) => {
      orderSum += item.price * item.count;
    });
    this.setState({
      ...this.state,
      basketSum: orderSum,
    }); 
  }

  /**
     * Подсчет количества товаров
     * @returns Number
     */
  calcOrderQuantity() {
    this.setState({
      ...this.state,
      basketQuantity: this.state.basket.length,
    }); 
    
  }
  /**
       * Изменить видимость корзины
       * @param isVisible
       */
  changeBasketVisibility(isVisible) {
    this.setState({
      ...this.state,
      isBasketVisible: isVisible,
    });
  }

}
export default Store;
