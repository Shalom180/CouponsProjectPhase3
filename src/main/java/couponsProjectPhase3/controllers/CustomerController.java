package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.AlreadyPurchasedException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.EmptyValueException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.UnavailableCouponException;
import couponsProjectPhase3.services.CustomerService;
import org.springframework.web.bind.annotation.*;

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
}
