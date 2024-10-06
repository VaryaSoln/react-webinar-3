import StoreModule from '../module';

class CategoryState extends StoreModule {
    initState() {
        return {
            categoryList: [],
        };
    }
    async load() {
        console.log("Загружаем категории с сервера");
        const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        const json = await response.json();
        console.log("категории с сервера:");
        console.log(json);
    
        const categories = json.result.items.map((item) => {
            return { value: item._id, title: item.title, parent: item.parent? item.parent._id: null, children: [] };
        });
        console.log("категории:");
        console.log(categories);

        const categoryTree = new CategoryTree(categories);
        console.log("категорий лист:");
        console.log(categoryTree.getCategoryList());

        this.setState(
            {
              ...this.getState(),
              categoryList: categoryTree.getCategoryList(),
            },
            'Добавление списка категорий',
          );
    };


}


class CategoryTree {

    constructor(categories) {

        this.root = categories.filter((item) => {
            if (item.parent === null) {
                return true;
            }
            else return false;
        })
        this.root.unshift({ value: "all", title: "Все", parent: null, children: [] });
        console.log(this.root);

        let mapping = {};
        categories.forEach((item) => {
            mapping = { ...mapping, [item.value]: item }
        });

        categories.forEach((item) => {
            if (item.parent !== null) {
                mapping[item.parent].children.push(item);
            }
        })

    };
    getCategoryList() {
        const list = [];
        this.addToCategoryList(list, this.root, 0);
        return list;
    }

    addToCategoryList(list, categories, level) {
        categories.forEach((item) => {
            list.push({value: item.value, title: "- ".repeat(level)+item.title});
            this.addToCategoryList(list, item.children, level+1);
        });
    }
}

export default CategoryState;