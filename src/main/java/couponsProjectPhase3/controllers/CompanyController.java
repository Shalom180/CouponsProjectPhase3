package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.services.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {
    private final CompanyService service;

    //ctor
    public CompanyController(CompanyService service) {
        this.service = service;
    }

    //methods
//    @GetMapping("/login/{email}/{password}")
//    public boolean login(@PathVariable String email, @PathVariable String password) {
//        return service.login(email, password);
//    }

    @PostMapping("/coupon")
    public String addCoupon(@RequestBody Coupon coupon) throws NonexistantObjectException, EmptyValueException, UnallowedUpdateException {
        service.addCoupon(coupon);
        return coupon.getTitle() + " Was Added Successfully.";
    }

    @PutMapping("/coupon")
    public String updateCoupon(@RequestBody Coupon coupon) throws NonexistantObjectException, EmptyValueException, UnallowedUpdateException {
        service.updateCoupon(coupon);
        return coupon.getTitle() + " Was Updated Successfully.";
    }

    @DeleteMapping("/coupon/{id}")
    public String deleteCoupon(@PathVariable int id) throws NonPositiveValueException, CompanyIdException, NegativeValueException, SQLException, NonexistantObjectException, DateException, EmptyValueException {
        service.deleteCoupon(id);
        return "A Coupon With Id of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/coupons")
    public List<Coupon> getCompanyCoupons() throws NonPositiveValueException, NegativeValueException, SQLException, DateException, EmptyValueException {
        return service.getCompanyCoupons();
    }

    @GetMapping("/bycategoryid")
    public List<Coupon> getCompanyCoupons(int categoryId) {
        return service.getCompanyCoupons(categoryId);
    }

    @GetMapping("/between/{minPrice}/{maxPrice}")
    public List<Coupon> getCompanyCoupons(@PathVariable double minPrice, @PathVariable double maxPrice) {
        return service.getCompanyCoupons(minPrice, maxPrice);
    }

    @GetMapping()
    public Company getCompanyDetails() {
        return service.getCompanyDetails();
    }

    @GetMapping("/categories")
    public List<Category> getCategories(){
        return service.getCategories();
    }
}
