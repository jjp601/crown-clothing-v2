import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Categories from '../categories/Categories.component';
import Category from '../category/Category.component';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/categories.action';

import './Shop.styles.scss';

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            dispatch(setCategoriesMap(categoryMap));
        }
        getCategoriesMap()
    })

    return (
        <Routes>
            <Route index element={<Categories />} />
            <Route path=":category" element={<Category />} />
        </Routes>     
    );
};

export default Shop;