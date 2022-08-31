export const selectCategories = (state) => (
    state.categories.categories.reduce((accum, category) => {
        const { title, items } = category;
        accum[title.toLowerCase()] = items;
        return accum;
    }, {}));