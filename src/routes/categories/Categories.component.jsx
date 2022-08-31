import { Fragment } from "react";
import { useSelector } from 'react-redux';

import { selectCategories } from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/CategoryPreview/CategoryPreview.component";

const Categories = () => {
    const categoriesMap = useSelector(selectCategories);

    return (
        <Fragment>       
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoryPreview key={title} title={title} products={products} />
                    )
                })
            }
        </Fragment>
    );
};

export default Categories;