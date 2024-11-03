import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../models/Category";

interface CategoriesState{
    categories: Category[];
}

const init: Category[] = [];

const categoriesSlice =  createSlice({
    name: 'categories',
    initialState: {
        categories: init
    },
    reducers: {
        fetchCategories(state:CategoriesState, action:PayloadAction<Category[]>) {
            state.categories = action.payload;
        },
        addCategory(state: CategoriesState, action:PayloadAction<Category>){
            state.categories.push(action.payload);
        },
        updateCategory(state: CategoriesState, action: PayloadAction<Category>) {
            const indexToUpdate = state.categories.findIndex(p=>p.id===action.payload.id)
            if(indexToUpdate>=0)
                state.categories[indexToUpdate] = action.payload;
        }, 
        deleteCategory(state: CategoriesState, action:PayloadAction<number>) {
            const indexToDelete = state.categories.findIndex(p=>p.id===action.payload)
            if (indexToDelete >= 0) {
                state.categories.splice(indexToDelete, 1);
            }
        }
    }
})

export const { fetchCategories, addCategory, updateCategory, deleteCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;