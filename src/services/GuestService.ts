import axios from "axios";
import { Category } from "../models/Category";
import { Coupon } from "../models/Coupon";
import { Customer } from "../models/Customer";

class GuestServive {

    async customerSignUp(customer: Customer) {
        return (await axios.post<Customer>(`http://localhost:8080/guest/signup`, customer)).data;

    }

    //methods that are shared with the customer service
    async getCategories() {
        return (await axios.get<Category[]>(`http://localhost:8080/guest/categories`)).data;

    }

    async getCoupons() {
        return (await axios.get<Coupon[]>(`http://localhost:8080/guest/coupons`)).data;
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
