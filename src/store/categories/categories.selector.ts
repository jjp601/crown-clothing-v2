import { createSelector } from 'reselect';

import { RootState } from '../store';

import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.types';

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap => categories.reduce((accum, category) => {
        const { title, items } = category;
        accum[title.toLowerCase()] = items;
        return accum;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);
    