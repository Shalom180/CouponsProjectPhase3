import axios from "axios";
import { Category } from "../models/Category";
import { Coupon } from "../models/Coupon";
import { Customer } from "../models/Customer";
import { store } from "../store";
import { fetchCompanies } from "../reducers/CompaniesSlice";
import { Company } from "../models/Company";

class GuestServive {

    async customerSignUp(customer: Customer) {
        return (await axios.post<Customer>(`http://localhost:8080/guest/signup`, customer)).data;

    }

    async getAllCompanies() {
        try {
            // Check if companies are already in Redux store
            const companies = store.getState().companies.companies;
            if (companies.length === 0) {
                const response = await axios.get<Company[]>("http://localhost:8080/guest/companies");
                store.dispatch(fetchCompanies(response.data)); // Fetch and update Redux store with companies
                return response.data; // Return the fetched companies
            }
            return companies; // Return companies from Redux store if already fetched
        } catch (error) {
            console.error("Error fetching companies:", error);
            throw error;
        }
    }

async getOneCompany(id: number): Promise<Company> {
    try {
        // First, check if the company is already in the Redux store
        const company = store.getState().companies.companies.find((company: Company) => company.id === id);
        
        if (company) {
            // If the company is found in the Redux store, return it
            return company;
        } else {
            // Otherwise, fetch the company from the server
            const response = await axios.get<Company>(`http://localhost:8080/guest/company/${id}`);
        
            return response.data; // Return the company data
        }
    } catch (error) {
        console.error("Error fetching company:", error);
        throw error; // Optionally handle the error (e.g., display an alert to the user)
    }
}

    

    //methods that are shared with the customer service
    async getCategories() {
        return (await axios.get<Category[]>(`http://localhost:8080/guest/categories`)).data;

    }

    async getCoupons() {
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/coupons`)).data;
    }

    async getOneCoupon(id: number) {
        return (await axios.get<Coupon>(`http://localhost:8080/guest/coupon/`+id)).data;
    }

    async getCouponsByPriceBetween(minPrice: number, maxPrice: number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/couponsbypricebetween/${minPrice}/${maxPrice}`)).data;
    }

    async getCouponsByCategoryId (categoryId:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/couponsbycategory/${categoryId}`)).data;
    }

    async getCouponsByCompanyId (companyId:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/couponsbycompany/${companyId}`)).data;
    }

    async getCouponsByCompanyIdAndCategoryId(companyId:number, categoryId:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/couponsbycompanyandcategory/${companyId}/${categoryId}`)).data;
    }

    async getCouponsByCompanyIdAndPriceBetween(companyId:number, minPrice:number, maxPrice:number){
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/couponsbycompanyandpricebetween/${companyId}/${minPrice}/${maxPrice}`)).data;
    }

    async getCouponsByCategoryIdAndPriceBetween(categoryId:number, minPrice:number, maxPrice:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/couponsbycategoryandpricebetween/${categoryId}/${minPrice}/${maxPrice}`)).data;

    }

    async getCouponsByCompanyIdAndCategoryAndPriceBetween(companyId:number, categoryId:number, minPrice:number, maxPrice:number){
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/couponsbycategoryandpricebetween/${companyId}/${categoryId}/${minPrice}/${maxPrice}`)).data;
    }
}

const guestService = new GuestServive;
export default guestService;
