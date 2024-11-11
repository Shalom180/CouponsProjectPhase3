import axios from "axios";
import { Coupon } from "../models/Coupon";
import { Customer } from "../models/Customer";
import { Category } from "../models/Category";

class CustomerService {
    async purchasecoupon(coupon: Coupon) {
        return (await axios.post<Coupon>("http://localhost:8080/customer/purchase", coupon)).data;
    }

    async getCustomerCoupons() {
        return (await axios.get<Coupon[]>("http://localhost:8080/customer/mycoupons")).data;
    }

    async getCustomerCouponsByCategory(categoryid: number) {
        return (await axios.get<Coupon[]>("http://localhost:8080/customer/mycouponsbycategory/" + categoryid)).data;
    }

    async getCustomerCouponsBetween(minPrice: number, maxPrice: number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/mycouponsbetween/${minPrice}/${maxPrice}`)).data;
    }

    async getCustomerDetails() {
        return (await axios.get<Customer>(`http://localhost:8080/customer`)).data;
    }

 //methods that are shared with the guest service
    async getCategories() {
        return (await axios.get<Category[]>(`http://localhost:8080/customer/categories`)).data;

    }

    async getCoupons() {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/coupons`)).data;
    }

    async getCouponsByPriceBetween(minPrice: number, maxPrice: number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/couponsbypricebetween/${minPrice}/${maxPrice}`)).data;
    }

    async getCouponsByCategoryId (categoryId:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/couponsbycategory/${categoryId}`)).data;
    }

    async getCouponsByCompanyId (companyId:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/couponsbycompany/${companyId}`)).data;
    }

    async getCouponsByCompanyIdAndCategoryId(companyId:number, categoryId:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/couponsbycompanyandcategory/${companyId}/${categoryId}`)).data;
    }

    async getCouponsByCompanyIdAndPriceBetween(companyId:number, minPrice:number, maxPrice:number){
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/couponsbycompanyandpricebetween/${companyId}/${minPrice}/${maxPrice}`)).data;
    }

    async getCouponsByCategoryIdAndPriceBetween(categoryId:number, minPrice:number, maxPrice:number) {
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/couponsbycategoryandpricebetween/${categoryId}/${minPrice}/${maxPrice}`)).data;

    }

    async getCouponsByCompanyIdAndCategoryAndPriceBetween(companyId:number, categoryId:number, minPrice:number, maxPrice:number){
        return (await axios.get<Coupon[]>(`http://localhost:8080/customer/couponsbycategoryandpricebetween/${companyId}/${categoryId}/${minPrice}/${maxPrice}`)).data;
    }
}