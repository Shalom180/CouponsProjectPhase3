package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.services.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private CustomerService service;

    //ctor
    public CustomerController(CustomerService service) {
        this.service = service;
    }

    //methods
//    @GetMapping("/login/{email}/{password}")
//    public boolean login(@PathVariable String email, @PathVariable String password) {
//        return service.login(email, password);
//    }

    @PostMapping("/purchase")
    public String purchaseCoupon(@RequestBody Coupon coupon) throws NonexistantObjectException, EmptyValueException, UnavailableCouponException, AlreadyPurchasedException {
        service.purchaseCoupon(coupon);
        return coupon.getTitle() + "Was Purchased Successfully.";
    }

    @GetMapping("/mycoupons")
    public List<Coupon> getCustomerCoupons() {
        return service.getCustomerCoupons();
    }

    @GetMapping("/mycouponsbycategory/{categoryId}")
    public List<Coupon> getCustomerCoupons(@PathVariable int categoryId) {
        return service.getCustomerCoupons(categoryId);
    }

    @GetMapping("/mycouponsbetween/{minPrice}/{maxPrice}")
    public List<Coupon> getCustomerCoupons(@PathVariable double minPrice, @PathVariable double maxPrice) throws NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        return service.getCustomerCoupons(minPrice, maxPrice);
    }

    @GetMapping()
    public Customer getCustomerDetails() throws NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        return service.getCustomerDetails();
    }


    //methods that are shared with the guest controller
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return service.getCategories();
    }

    @GetMapping("/coupons")
    public List<Coupon> getCoupons() {
        return service.getCoupons();
    }

    @GetMapping("/couponsbypricebetween/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByPriceBetween(@PathVariable double minPrice, @PathVariable double maxPrice) {
        return service.getCouponsByPriceBetween(minPrice, maxPrice);
    }

    @GetMapping("/couponsbycategory/{categoryId}")
    public List<Coupon> getCouponsByCategoryId(@PathVariable int categoryId) {
        return service.getCouponsByCategoryId(categoryId);
    }

    @GetMapping("/couponsbycompany/{companyId}")
    public List<Coupon> getCouponsByCompanyId(@PathVariable int companyId) {
        return service.getCouponsByCompanyId(companyId);
    }

    @GetMapping("/couponsbycompanyandcategory/{companyId}/{categoryId}")
    public List<Coupon> getCouponsByCompanyIdAndCategoryId(@PathVariable int companyId, @PathVariable int categoryId) {
        return service.getCouponsByCompanyIdAndCategoryId(companyId, categoryId);
    }

    @GetMapping("/couponsbycompanyandpricebetween/{companyId}/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByCompanyIdAndPriceBetween(@PathVariable int companyId, @PathVariable double minPrice, @PathVariable double maxPrice) {
        return service.getCouponsByCompanyIdAndPriceBetween(companyId, minPrice, maxPrice);
    }

    @GetMapping("/couponsbycategoryandpricebetween/{categoryId}/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByCategoryIdAndPriceBetween(@PathVariable int categoryId, @PathVariable double minPrice, @PathVariable double maxPrice) {
        return service.getCouponsByCategoryIdAndPriceBetween(categoryId, minPrice, maxPrice);
    }

    @GetMapping("/couponsbycomapnyandcategoryandpricebetween/{companyId}/{categoryId}/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByCompanyIdAndCategoryAndPriceBetween(@PathVariable int companyId, @PathVariable int categoryId, @PathVariable  double minPrice, @PathVariable double maxPrice) {
        return service.getCouponsByCompanyIdAndCategoryAndPriceBetween(companyId, categoryId, minPrice, maxPrice);
    }

}
