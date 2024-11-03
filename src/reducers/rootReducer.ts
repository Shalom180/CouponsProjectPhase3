// src/features/index.ts
import { combineReducers } from 'redux';
import categoriesReducer from './CategoriesSlice';
import companiesReducer from './CompaniesSlice';

const rootReducer = combineReducers({
    companies: companiesReducer,
    categories: categoriesReducer
});

export default rootReducer;
