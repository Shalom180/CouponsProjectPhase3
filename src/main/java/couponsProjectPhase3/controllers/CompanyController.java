package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.beans.TokenProps;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.services.CompanyService;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/company")
public class CompanyController {
    private Map<String, TokenProps> activeTokens;

    //ctor
    public CompanyController(Map<String, TokenProps> activeTokens) {
        this.activeTokens = activeTokens;
    }

    //methods
    @PostMapping("/coupon")
    public String addCoupon(@RequestBody Coupon coupon, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException, EmptyValueException, UnallowedUpdateException {
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        service.addCoupon(coupon);
        return coupon.getTitle() + " Was Added Successfully.";
    }

    @PutMapping("/coupon")
    public String updateCoupon(@RequestBody Coupon coupon, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException, EmptyValueException, UnallowedUpdateException {
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        service.updateCoupon(coupon);
        return coupon.getTitle() + " Was Updated Successfully.";
    }

    @DeleteMapping("/coupon/{id}")
    public String deleteCoupon(@PathVariable int id, @RequestHeader("Authorization") String authorisation) throws NonPositiveValueException, CompanyIdException, NegativeValueException, SQLException, NonexistantObjectException, DateException, EmptyValueException {
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        service.deleteCoupon(id);
        return "A Coupon With Id of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/coupons")
    public List<Coupon> getCompanyCoupons(@RequestHeader("Authorization") String authorisation) throws NonPositiveValueException, NegativeValueException, SQLException, DateException, EmptyValueException {
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        return service.getCompanyCoupons();
    }

    @GetMapping("/bycategoryid")
    public List<Coupon> getCompanyCoupons(int categoryId, @RequestHeader("Authorization") String authorisation) {
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        return service.getCompanyCoupons(categoryId);
    }

    @GetMapping("/between/{minPrice}/{maxPrice}")
    public List<Coupon> getCompanyCoupons(@PathVariable double minPrice, @PathVariable double maxPrice, @RequestHeader("Authorization") String authorisation) {
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        return service.getCompanyCoupons(minPrice, maxPrice);
    }

    @GetMapping()
    public Company getCompanyDetails(@RequestHeader("Authorization") String authorisation) {
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        return service.getCompanyDetails();
    }

    @GetMapping("/categories")
    public List<Category> getCategories(@RequestHeader("Authorization") String authorisation){
        CompanyService service = (CompanyService) activeTokens.get(authorisation).getClientService();
        return service.getCategories();
    }
}
