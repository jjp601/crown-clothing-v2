import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCategories } from '../../store/categories/categories.selector';

import ProductCard from '../../components/ProductCard/ProductCard.component';

import { CategoryContainer, CategoryTitle } from './Category.styles';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategories);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category])
    }, [category, categoriesMap])

    return (
        <Fragment>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {
                    products && 
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </CategoryContainer>
        </Fragment>
        
    )
};

export default Category;