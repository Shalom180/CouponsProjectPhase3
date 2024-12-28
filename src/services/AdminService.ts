import axios from "axios";
import { store } from "../store";
import { Company } from "../models/Company";
import { addCompany, deleteCompany, fetchCompanies, updateCompany } from "../reducers/CompaniesSlice";
import { Customer } from "../models/Customer";
import { Category } from "../models/Category";
import { addCategory, fetchCategories, updateCategory } from "../reducers/CategoriesSlice";
import { Admin } from "../models/Admin";

class AdminService {

    async getAdminDetails() {
        try {
            return (await axios.get<Admin>("http://localhost:8080/admin")).data;
        } catch (error) {
            console.error("Error fetching admin:", error);
            throw error; // Propagate the error to be handled in the calling component
        }
    }

    async addCompany(company: Company) {
        try {
            const response = await axios.post<Company>("http://localhost:8080/admin/company", company);
            store.dispatch(addCompany(response.data)); // Update Redux state with the added company
            return response.data; // Return the newly added company
        } catch (error) {
            console.error("Error adding company:", error);
            throw error; // Propagate the error to be handled in the calling component
        }
    }

    async updateCompany(company: Company) {
        try {
            const response = await axios.put<Company>("http://localhost:8080/admin/company", company);
            store.dispatch(updateCompany(response.data)); // Update Redux state with the updated company
            return response.data; // Return the updated company
        } catch (error) {
            console.error("Error updating company:", error);
            throw error;
        }
    }

    async deleteCompany(id: number) {
        try {
            const response = await axios.delete<Company>(`http://localhost:8080/admin/company/${id}`);
            store.dispatch(deleteCompany(id)); // Remove company from Redux state
            return response.data; // Return deleted company
        } catch (error) {
            console.error("Error deleting company:", error);
            throw error;
        }
    }

    async getAllCompanies() {
        try {
            // Check if companies are already in Redux store
            const companies = store.getState().companies.companies;
            if (companies.length === 0) {
                const response = await axios.get<Company[]>("http://localhost:8080/admin/companies");
                store.dispatch(fetchCompanies(response.data)); // Fetch and update Redux store with companies
                return response.data; // Return the fetched companies
            }
            return companies; // Return companies from Redux store if already fetched
        } catch (error) {
            console.error("Error fetching companies:", error);
            throw error;
        }
    }

    async getOneCompany(id: number) {
        try {
            let company = store.getState().companies.companies.find(c => c.id === id);
            if (!company) {
                company = (await axios.get<Company>(`http://localhost:8080/admin/company/${id}`)).data;
            }
            return company; // Return found or fetched company
        } catch (error) {
            console.error("Error fetching company:", error);
            throw error;
        }
    }

    // Customer-related methods
    async addCustomer(customer: Customer) {
        try {
            const response = await axios.post("http://localhost:8080/admin/customer", customer);
            return response.data; // Return added customer
        } catch (error) {
            console.error("Error adding customer:", error);
            throw error;
        }
    }

    async updateCustomer(customer: Customer) {
        try {
            const response = await axios.put("http://localhost:8080/admin/customer", customer);
            return response.data; // Return updated customer
        } catch (error) {
            console.error("Error updating customer:", error);
            throw error;
        }
    }

    async deleteCustomer(id: number) {
        try {
            const response = await axios.delete<Customer>(`http://localhost:8080/admin/customer/${id}`);
            return response.data; // Return deleted customer
        } catch (error) {
            console.error("Error deleting customer:", error);
            throw error;
        }
    }

    async getAllCustomers() {
        try {
            const response = await axios.get<Customer[]>('http://localhost:8080/admin/customers');
            return response.data; // Return all customers
        } catch (error) {
            console.error("Error fetching customers:", error);
            throw error;
        }
    }

    async getOneCustomer(id: number) {
        try {
            const response = await axios.get<Customer>(`http://localhost:8080/admin/customer/${id}`);
            return response.data; // Return one customer
        } catch (error) {
            console.error("Error fetching customer:", error);
            throw error;
        }
    }

    // Category-related methods
    async addCategory(category: Category) {
        try {
            const response = await axios.post<Category>("http://localhost:8080/admin/category", category);
            store.dispatch(addCategory(response.data)); // Dispatch the action to update Redux
            return response.data; // Return added category
        } catch (error) {
            console.error("Error adding category:", error);
            throw error;
        }
    }

    async updateCategory(category: Category) {
        try {
            const response = await axios.put<Category>("http://localhost:8080/admin/category", category);
            store.dispatch(updateCategory(response.data)); // Dispatch the action to update Redux
            return response.data; // Return updated category
        } catch (error) {
            console.error("Error updating category:", error);
            throw error;
        }
    }

    async getAllCategories() {
        try {
            const categories = store.getState().categories.categories;
            if (categories.length === 0) {
                const response = await axios.get<Category[]>("http://localhost:8080/admin/categories");
                store.dispatch(fetchCategories(response.data)); // Dispatch to Redux
                return response.data; // Return the fetched categories
            }
            return categories; // Return the cached categories from Redux store
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    }

    async getOneCategory(id: number) {
        try {
            let category = store.getState().categories.categories.find(c => c.id === id);
            if (!category) {
                category = (await axios.get<Category>(`http://localhost:8080/admin/category/${id}`)).data;
            }
            return category; // Return found or fetched category
        } catch (error) {
            console.error("Error fetching category:", error);
            throw error;
        }
    }
}

const adminService = new AdminService();
export default adminService;
