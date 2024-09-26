import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      currentPage: 3,
      maxPage: 25,
    };
  }

  /**
   * Установка текущей страницы каталога
   * @param page Номер страницы
   */
  setCurrentPage(page) {
    this.setState(
      {
        ...this.getState(),
        currentPage: page,

      },
      "Устанавливаем текущую страницу каталога"
    )
  }
  /**
 * Установка последней страницы каталога
 * @param page Номер страницы
 */
  setMaxPage(page) {
    this.setState(
      {
        ...this.getState(),
        maxPage: page,

      },
      "Устанавливаем последнюю страницу каталога"
    )
  }

  async load(currentPage) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${10 * (currentPage - 1)}&fields=items(_id, title, price),count`);
    const json = await response.json();
    console.log(json);
    this.setMaxPage(Math.ceil(json.result.count/10));
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
