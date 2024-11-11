package couponsProjectPhase3.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import couponsProjectPhase3.beans.*;
import couponsProjectPhase3.exceptions.WrongEmailOrPasswordException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.services.*;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/guest")
public class GuestController {
    private List<String> activeAdminTokens;
    private List<String> activeCompanyTokens;
    private List<String> activeCustomerTokens;
    private AdminService adminService;
    private CompanyService companyService;
    private CustomerService customerService;
    private LoginManager loginManager;

    //ctor


    public GuestController(List<String> activeAdminTokens, List<String> activeCompanyTokens, List<String> activeCustomerTokens, AdminService adminService, CompanyService companyService, CustomerService customerService, LoginManager loginManager) {
        this.activeAdminTokens = activeAdminTokens;
        this.activeCompanyTokens = activeCompanyTokens;
        this.activeCustomerTokens = activeCustomerTokens;
        this.adminService = adminService;
        this.companyService = companyService;
        this.customerService = customerService;
        this.loginManager = loginManager;
    }

    //methods
    @PostMapping("/signup")
    public String customerSignUp(@RequestBody Customer customer) throws EmptyValueException, UnallowedUpdateException {
        adminService.addCustomer(customer);
        return "User " + customer.getFirstName() + " " + customer.getLastName() + " added";
    }

    @PostMapping("login")
    public String login(@RequestBody String email, @RequestBody String password) throws WrongEmailOrPasswordException, EmptyValueException, NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException {
        ClientService clientService = loginManager.login(email, password);
        if (clientService instanceof AdminService){
            String adminToken = createAdminToken();
            activeAdminTokens.add(adminToken);
            return adminToken;
        }
        else if (clientService instanceof CompanyService) {
            Company company = ((CompanyService) clientService).getCompanyDetails();
            String companyToken = createCompanyToken(company);
            activeCompanyTokens.add(companyToken);
            return companyToken;
        } else if (clientService instanceof CustomerService) {
            Customer customer = ((CustomerService) clientService).getCustomerDetails();
            String customerToken = createCustomerToken(customer);
            activeCustomerTokens.add(customerToken);
            return customerToken;
        } else throw new WrongEmailOrPasswordException();
    }

    //todo add sign out method

    private String createAdminToken() {
        Date expires = new Date();
        expires.setTime(expires.getTime()+1000*60*60);
        return JWT.create()
                .withIssuer("JohnCoupon")
                .withIssuedAt(new Date())
                .withClaim("username", "admin")
                .withExpiresAt(expires)
                .sign(Algorithm.none());
    }

    private String createCompanyToken(Company company) {
        Date expires = new Date();
        expires.setTime(expires.getTime()+1000*60*60);
        return JWT.create()
                .withIssuer("JohnCoupon")
                .withIssuedAt(new Date())
                .withClaim("id", company.getId())
                .withClaim("name", company.getName())
                .withClaim("email", company.getEmail())
                .withExpiresAt(expires)
                .sign(Algorithm.none());
    }

    private String createCustomerToken(Customer customer) {
        Date expires = new Date();
        expires.setTime(expires.getTime()+1000*60*60);
        return JWT.create()
                .withIssuer("JohnCoupon")
                .withIssuedAt(new Date())
                .withClaim("id", customer.getId())
                .withClaim("firstname", customer.getFirstName())
                .withClaim("lastname", customer.getLastName())
                .withClaim("email", customer.getEmail())
                .withExpiresAt(expires)
                .sign(Algorithm.none());
    }

    //method that are shared with the customer controller
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return customerService.getCategories();
    }

    @GetMapping("/coupons")
    public List<Coupon> getCoupons() {
        return customerService.getCoupons();
    }

    @GetMapping("/coupons/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByPriceBetween(@PathVariable double minPrice, @PathVariable double maxPrice) {
        return customerService.getCouponsByPriceBetween(minPrice, maxPrice);
    }
    @GetMapping("/couponsbycategory/{categoryId}")
    public List<Coupon> getCouponsByCategoryId(@PathVariable int categoryId) {
        return customerService.getCouponsByCategoryId(categoryId);
    }

    @GetMapping("/couponsbycompany/{companyId}")
    public List<Coupon> getCouponsByCompanyId(@PathVariable int companyId) {
        return customerService.getCouponsByCompanyId(companyId);
    }

    @GetMapping("/couponsbycompanyandcategory/{companyId}/{categoryId}")
    public List<Coupon> getCouponsByCompanyIdAndCategoryId(@PathVariable int companyId, @PathVariable int categoryId) {
        return customerService.getCouponsByCompanyIdAndCategoryId(companyId, categoryId);
    }

    @GetMapping("/couponsbycompanyandprice/{companyId}/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByCompanyIdAndPriceBetween(@PathVariable int companyId, @PathVariable double minPrice, @PathVariable double maxPrice) {
        return customerService.getCouponsByCompanyIdAndPriceBetween(companyId, minPrice, maxPrice);
    }

    @GetMapping("/couponsbycategoryandprice/{categoryId}/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByCategoryIdAndPriceBetween(@PathVariable int categoryId, @PathVariable double minPrice, @PathVariable double maxPrice) {
        return customerService.getCouponsByCategoryIdAndPriceBetween(categoryId, minPrice, maxPrice);
    }

    @GetMapping("/couponsbycomapnyandcategoryandprice/{companyId}/{categoryId}/{minPrice}/{maxPrice}")
    public List<Coupon> getCouponsByCompanyIdAndCategoryAndPriceBetween(@PathVariable int companyId, @PathVariable int categoryId, @PathVariable  double minPrice, @PathVariable double maxPrice) {
        return customerService.getCouponsByCompanyIdAndCategoryAndPriceBetween(companyId, categoryId, minPrice, maxPrice);
    }



}
