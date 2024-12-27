// src/features/index.ts
import { combineReducers } from 'redux';
import categoriesReducer from './CategoriesSlice';
import companiesReducer from './CompaniesSlice';
import authReducer from './AuthSlice';

const rootReducer = combineReducers({
    companies: companiesReducer,
    categories: categoriesReducer,
    auth: authReducer,
});

export default rootReducer;
