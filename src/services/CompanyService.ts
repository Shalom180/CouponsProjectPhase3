import axios from "axios";
import { Coupon } from "../models/Coupon";
import { Category } from "../models/Category";
import { Company } from "../models/Company";

class CompanyService{
    // async login(email:string, password:string):Promise<boolean> {
    //     return (await axios.get<boolean>(`http://localhost:8080/company/login/${email}/${password}`)).data;
    // }

    async addCoupon(coupon: Coupon) {
        return (await axios.post<Coupon>("http://localhost:8080/company/coupon", coupon)).data;
    }

    async updateCoupon(coupon: Coupon) {
        return (await axios.put<Coupon>("http://localhost:8080/company/coupon", coupon)).data;
    }

    async deleteCoupon(id: number) {
        return (await axios.delete<Coupon>("http://localhost:8080/company/coupon/" + id)).data;
    }

    async getCompanyCoupons() {
        return (await axios.get<Coupon[]>("http://localhost:8080/company/coupons")).data;
    }

    async getCompanyCouponsByCategory(category: Category) {
        return (await axios.get<Coupon[]>("http://localhost:8080/company/bycategory", {
            params: {category}})).data;
    }

    async getCompanyCouponsByPriceBetween(minPrice: number, maxPrice: number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/company/between/${minPrice}/${maxPrice}`)).data;
    }

    async getCompanyDetails() {
        return (await axios.get<Company>(`http://localhost:8080/company`)).data;
    }

    async getCategories() {
        return (await axios.get<Category>(`http://localhost:8080/company/categories`)).data
    }

}
const companyService = new CompanyService();
export default companyService;