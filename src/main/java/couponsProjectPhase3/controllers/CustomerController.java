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
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {
    private CustomerService service;

    //ctor
    public CustomerController(CustomerService service) {
        this.service = service;
    }

    //methods
    @GetMapping("/login/{email}/{password}")
    public boolean login(@PathVariable String email, @PathVariable String password) {
        return service.login(email, password);
    }

    @PostMapping("/purchase")
    public String purchaseCoupon(@RequestBody Coupon coupon) throws NonexistantObjectException, EmptyValueException, UnavailableCouponException, AlreadyPurchasedException {
        service.purchaseCoupon(coupon);
        return coupon.getTitle() + "Was Purchased Successfully.";
    }

    @GetMapping("/coupons")
    public List<Coupon> getCustomerCoupons() {
        return service.getCustomerCoupons();
    }

    @GetMapping("/couponsbycategory/category")
    public List<Coupon> getCustomerCoupons(@RequestBody Category category) {
        return service.getCustomerCoupons(category);
    }

    @GetMapping("/couponsbelow/{maxPrice}")
    public List<Coupon> getCustomerCoupons(@PathVariable double maxPrice) throws NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        return service.getCustomerCoupons(maxPrice);
    }

    @GetMapping()
    public Customer getCustomerDetails() throws NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        return service.getCustomerDetails();
    }

    public List<Category> getCategories() {
        return service.getCategories();
    }

}
