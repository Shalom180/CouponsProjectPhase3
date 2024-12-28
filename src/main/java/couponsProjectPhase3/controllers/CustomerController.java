package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.beans.TokenProps;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.services.CompanyService;
import couponsProjectPhase3.services.CustomerService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private Map<String, TokenProps> activeTokens;

    //ctor
    public CustomerController(Map<String, TokenProps> activeTokens) {
        this.activeTokens = activeTokens;
    }


    //methods

    private CustomerService validateAndGetCustomerService(String authorization) {
        String token = authorization.replace("Bearer ", "");
        TokenProps tokenProps = activeTokens.get(token);
        if (tokenProps == null) {
            throw new IllegalArgumentException("Invalid or expired token.");
        }
        return (CustomerService) tokenProps.getClientService();
    }

    @PostMapping("/purchase")
    public Coupon purchaseCoupon(@RequestBody Coupon coupon, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException, EmptyValueException, UnavailableCouponException, AlreadyPurchasedException {
        CustomerService service = validateAndGetCustomerService(authorisation);
        return service.purchaseCoupon(coupon);
    }

    @GetMapping("/mycoupons")
    public List<Coupon> getCustomerCoupons(@RequestHeader("Authorization") String authorization) {
        CustomerService service = validateAndGetCustomerService(authorization);
        return service.getCustomerCoupons();
    }


    @GetMapping("/mycouponsbycategory/{categoryId}")
    public List<Coupon> getCustomerCoupons(@PathVariable int categoryId, @RequestHeader("Authorization") String authorisation) {
        CustomerService service = (CustomerService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getCustomerCoupons(categoryId);
    }

    @GetMapping("/mycouponsbetween/{minPrice}/{maxPrice}")
    public List<Coupon> getCustomerCoupons(@PathVariable double minPrice, @PathVariable double maxPrice, @RequestHeader("Authorization") String authorisation) throws NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        CustomerService service = (CustomerService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getCustomerCoupons(minPrice, maxPrice);
    }

    @GetMapping()
    public Customer getCustomerDetails(@RequestHeader("Authorization") String authorisation) throws NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        CustomerService service = (CustomerService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getCustomerDetails();
    }


    //methods that are shared with the guest controller
    @GetMapping("/categories")
    public List<Category> getCategories(@RequestHeader("Authorization") String authorisation) {
        CustomerService service = (CustomerService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getCategories();
    }

    @GetMapping("/coupons")
    public List<Coupon> getCoupons(@RequestHeader("Authorization") String authorisation) {
        CustomerService service = (CustomerService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getCoupons();
    }

    @GetMapping("/coupon/{id}")
    public Coupon getOneCoupon(@RequestHeader("Authorization") String authorisation, @PathVariable int id) {
        CustomerService service = (CustomerService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getOneCoupon(id);
    }


//    @GetMapping("/couponsbypricebetween/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByPriceBetween(@PathVariable double minPrice, @PathVariable double maxPrice) {
//        return service.getCouponsByPriceBetween(minPrice, maxPrice);
//    }
//
//    @GetMapping("/couponsbycategory/{categoryId}")
//    public List<Coupon> getCouponsByCategoryId(@PathVariable int categoryId) {
//        return service.getCouponsByCategoryId(categoryId);
//    }
//
//    @GetMapping("/couponsbycompany/{companyId}")
//    public List<Coupon> getCouponsByCompanyId(@PathVariable int companyId) {
//        return service.getCouponsByCompanyId(companyId);
//    }
//
//    @GetMapping("/couponsbycompanyandcategory/{companyId}/{categoryId}")
//    public List<Coupon> getCouponsByCompanyIdAndCategoryId(@PathVariable int companyId, @PathVariable int categoryId) {
//        return service.getCouponsByCompanyIdAndCategoryId(companyId, categoryId);
//    }
//
//    @GetMapping("/couponsbycompanyandpricebetween/{companyId}/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByCompanyIdAndPriceBetween(@PathVariable int companyId, @PathVariable double minPrice, @PathVariable double maxPrice) {
//        return service.getCouponsByCompanyIdAndPriceBetween(companyId, minPrice, maxPrice);
//    }
//
//    @GetMapping("/couponsbycategoryandpricebetween/{categoryId}/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByCategoryIdAndPriceBetween(@PathVariable int categoryId, @PathVariable double minPrice, @PathVariable double maxPrice) {
//        return service.getCouponsByCategoryIdAndPriceBetween(categoryId, minPrice, maxPrice);
//    }
//
//    @GetMapping("/couponsbycomapnyandcategoryandpricebetween/{companyId}/{categoryId}/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByCompanyIdAndCategoryAndPriceBetween(@PathVariable int companyId, @PathVariable int categoryId, @PathVariable  double minPrice, @PathVariable double maxPrice) {
//        return service.getCouponsByCompanyIdAndCategoryAndPriceBetween(companyId, categoryId, minPrice, maxPrice);
//    }

}
