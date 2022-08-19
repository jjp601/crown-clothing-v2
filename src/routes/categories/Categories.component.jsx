import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../context/Categories.context";

import CategoryPreview from "../../components/CategoryPreview/CategoryPreview.component";

const Categories = () => {
    const { categoriesMap } = useContext(CategoriesContext);

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