import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './CategoriesSlice';
import companiesReducer from './CompaniesSlice';

const store = configureStore({
    reducer: rootReducer,
});

export default store;