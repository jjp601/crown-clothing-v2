import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Categories from '../categories/Categories.component';
import Category from '../category/Category.component';

import { fetchCategoriesAsync } from '../../store/categories/categories.action';

import './Shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, [])

    return (
        <Routes>
            <Route index element={<Categories />} />
            <Route path=":category" element={<Category />} />
        </Routes>     
    );
};

export default Shop;