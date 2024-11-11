import axios from "axios";
import { Company } from "../models/Company";
import store from "../store";
import { addCompany, deleteCompany, fetchCompanies, updateCompany } from "../reducers/CompaniesSlice";
import { Customer } from "../models/Customer";
import { Category } from "../models/Category";
import { addCategory, fetchCategories, updateCategory } from "../reducers/CategoriesSlice";

class AdminService{
    // async login(email:string, password:string):Promise<boolean> {
    //     return (await axios.get<boolean>(`http://localhost:8080/admin/login/${email}/${password}`)).data;
    // }

    async addCompany(company:Company) {
        const response = (await axios.post<Company>("http://localhost:8080/admin/company", company))
        store.dispatch(addCompany(company))
        return response.data;
    }

    async updateCompany(company:Company) {
        const response = (await axios.put<Company>("http://localhost:8080/admin/company", company))
        store.dispatch(updateCompany(company))
        return response.data;
    }

    async deleteCompany(id:number) {
        const response = (await axios.delete<Company>(`http://localhost:8080/admin/company/${id}`))
        store.dispatch(deleteCompany(id))
        return response.data;
    }

    async getAllCompanies() {
        if(store.getState().rootReducer.companies.companies.length === 0)
            store.dispatch(fetchCompanies((await axios.get<Company[]>("http://localhost:8080/admin/companies")).data))
        return store.getState().rootReducer.companies.companies;
    }

    async getOneCompany(id: number) {
        let company = store.getState().rootReducer.companies.companies.find(c => c.id===id);
        if (!company)
            company = (await axios.get<Company>(`http://localhost:8080/admin/company/${id}`)).data;
        return company;
    }

    async addCustomer(custumer: Customer) {
        const response = (await axios.post(`http://localhost:8080/admin/customer`, custumer))
        return response.data;
    }

    async updateCustomer(customer: Customer) {
        const response = (await axios.put(`http://localhost:8080/admin/customer`, customer))
        return response.data;
    }

    async deleteCustomer(id: number) {
        const response =(await axios.delete<Customer>(`http://localhost:8080/admin/customer/${id}`))
        return response.data;
    }

    async getAllCustomers() {
        const response = await axios.get<Customer[]>('http://localhost:8080/admin/customers');
        return response.data;
    }

    async getOneCustomer(id: number) {
        const response = await axios.get<Customer>('http://localhost:8080/admin/customers');
        return response.data;
    }

    //

    async addCategory(category: Category) {
        const response = (await axios.post<Category>("http://localhost:8080/admin/category", category))
        store.dispatch(addCategory(category));
        return response.data;
    }

    async updateCategory(category: Category) {
        const response = (await axios.put<Category>("http://localhost:8080/admin/category", category))
        store.dispatch(updateCategory(category))
        return response.data;
    }

    async getAllcategories() {
        if(store.getState().rootReducer.categories.categories.length === 0)
            store.dispatch(fetchCategories((await axios.get<Category[]>("http://localhost:8080/admin/categories")).data))
        return store.getState().rootReducer.companies.companies;
    }

    async getOneCategory(id: number) {
        let category = store.getState().rootReducer.categories.categories.find(c => c.id===id);
        if (!category)
            category = (await axios.get<Company>(`http://localhost:8080/admin/category/${id}`)).data;
        return category;
    }


}

    const adminService = new AdminService();
    export default adminService;