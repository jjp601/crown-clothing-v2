import { Routes, Route } from 'react-router-dom';

import Categories from '../categories/Categories.component';
import Category from '../category/Category.component';

import './Shop.styles.scss';

const Shop = () => {

    return (
        <Routes>
            <Route index element={<Categories />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;