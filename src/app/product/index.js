import { useCallback, useEffect, useState } from 'react';
import {useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import PageLayout from '../../components/page-layout';
import Card from '../../components/card';
import useSelector from '../../store/use-selector';


function Product() {
    const [data, setData] = useState({});
    const params = useParams();
    useEffect(() => {
        load();
    }, [params]);
    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
    }));
    const store = useStore();

    const callbacks = {
        addToBasket: useCallback((product) =>  {console.log("Product"); console.log(product); store.actions.basket.addToBasket(params.cardId, product)}, [store]),
        goToBasket: useCallback(() => store.actions.modals.open("basket"), [store]),
    };

    async function load() {
        console.log("Загружаем данные с сервера");
        const response = await fetch(`/api/v1/articles/${params.cardId}?fields=*,madeIn(title,code),category(title)`);
        const json = await response.json();
        console.log(json);
        
        setData({
            product: json.result,
            title: json.result.title,
            description: json.result.description,
            madeIn: json.result.madeIn.title,
            category: json.result.category.title,
            year: json.result.edition,
            price: json.result.price,
        });
    };


    return (
        <PageLayout>
            <Card
                onAdd={callbacks.addToBasket}
                onOpen={callbacks.goToBasket}
                sum={select.sum}
                amount={select.amount}
                data={data}
            />
        </PageLayout>

    );
}


export default Product;
