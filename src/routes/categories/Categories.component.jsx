import { Fragment } from "react";
import { useSelector } from 'react-redux';

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/CategoryPreview/CategoryPreview.component";
import Spinner from "../../components/Spinner/Spinner.component";

const Categories = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>       
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    Object.keys(categoriesMap).map((title) => {
                        const products = categoriesMap[title];
                        return (
                            <CategoryPreview key={title} title={title} products={products} />
                        )
                    })
                )
            }
        </Fragment>
    );
};

export default Categories;