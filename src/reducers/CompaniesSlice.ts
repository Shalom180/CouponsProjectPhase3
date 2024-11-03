import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Company } from "../models/Company";

// The state we save in memory
interface CompaniesState{
    companies: Company[];
}

//Initial state
const initialState: Company[] = [];

const companiesSlice = createSlice({
    name: 'companies',
    initialState:{
        companies: initialState
    },
    reducers: {
        fetchCompanies(state:CompaniesState, action:PayloadAction<Company[]>){
            state.companies = action.payload;
        },
        addCompany(state:CompaniesState, action:PayloadAction<Company>){
            state.companies.push(action.payload);
        },
        updateCompany(state:CompaniesState, action:PayloadAction<Company>){
            const indexToUpdate = state.companies.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >=0)
                state.companies[indexToUpdate] = action.payload;
        },
        deleteCompany(state:CompaniesState, action:PayloadAction<number>){
            const indexToDelete = state.companies.findIndex(p => p.id === action.payload);
            if (indexToDelete >=0)
                state.companies.splice(indexToDelete, 1);
        }

    }
});

export const {fetchCompanies, addCompany, updateCompany, deleteCompany} = companiesSlice.actions;

export default companiesSlice.reducer;