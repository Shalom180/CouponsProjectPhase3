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

@RestController
@RequestMapping("/guest")
public class GuestController {
    private Map<String, TokenProps> activeTokens;
    private AdminService adminService;
    private CustomerService customerService;
    private LoginManager loginManager;

    //ctor
    public GuestController(Map<String, TokenProps> activeTokens, AdminService adminService, CustomerService customerService, LoginManager loginManager) {
        this.activeTokens = activeTokens;
        this.adminService = adminService;
        this.customerService = customerService;
        this.loginManager = loginManager;
    }

    //methods
    @PostMapping("/signup")
    public String customerSignUp(@RequestBody Customer customer) throws EmptyValueException, UnallowedUpdateException, SQLException, WrongEmailOrPasswordException {
        adminService.addCustomer(customer);
        return login(customer.getEmail(), customer.getPassword());
    }

    @PostMapping("/login")
    public String login(@RequestBody String email, @RequestBody String password) throws WrongEmailOrPasswordException, EmptyValueException, NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, NameException, SQLException, DateException {
        ClientService clientService = loginManager.login(email, password);
        String token = createToken(clientService);
        //todo change null!
        activeTokens.put(token, new TokenProps(clientService));
        return token;
    }

    @PostMapping("signout")
    public String signOut(@RequestHeader("Authorization") String authorization) throws EmptyValueException {
        if (authorization == null || authorization.isEmpty())
            throw new EmptyValueException();
        String username = JWT.decode(authorization).getClaim("username").asString();
        activeTokens.remove(authorization);
        return username  + " logged out successfully";
    }

    private String createToken(ClientService clientService) throws EmptyValueException {
        Date expires = new Date();
        expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24);
        String token = "";
        if (clientService == null)
            throw new EmptyValueException();

        else if (clientService instanceof AdminService) {
            Admin admin = ((AdminService) clientService).getAdminDetails();
            token = JWT.create()
                    .withIssuer("JohnCoupon")
                    .withIssuedAt(new Date())
                    .withClaim("clientType", "ADMINISTRATOR")
                    .withClaim("username", admin.getName())
                    .withClaim("email", admin.getEmail())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        } else if (clientService instanceof CompanyService) {
            Company company = ((CompanyService) clientService).getCompanyDetails();
            token = JWT.create()
                    .withIssuer("JohnCoupon")
                    .withIssuedAt(new Date())
                    .withClaim("clientType", "COMPANY")
                    .withClaim("username", company.getName())
                    .withClaim("email", company.getEmail())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        } else if (clientService instanceof CustomerService) {
            Customer customer = ((CustomerService) clientService).getCustomerDetails();
            token = JWT.create()
                    .withIssuer("JohnCoupon")
                    .withIssuedAt(new Date())
                    .withClaim("clientType", "CUSTOMER")
                    .withClaim("username", customer.getFirstName() + " " + customer.getLastName())
                    .withClaim("email", customer.getEmail())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        }
        return token;
    }


    //method that are shared with the customer controller
    @GetMapping("/categories")
    public List<Category> getCategories() {
        return customerService.getCategories();
    }

    @GetMapping("/coupons")
    public List<Coupon> getCoupons() {
        List<Coupon> coups =  customerService.getCoupons();
        System.out.println(coups);
        return coups;
    }


//todo decide what to do with it
//    @GetMapping("/coupons/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByPriceBetween(@PathVariable double minPrice, @PathVariable double maxPrice) {
//        return customerService.getCouponsByPriceBetween(minPrice, maxPrice);
//    }
//
//    @GetMapping("/couponsbycategory/{categoryId}")
//    public List<Coupon> getCouponsByCategoryId(@PathVariable int categoryId) {
//        return customerService.getCouponsByCategoryId(categoryId);
//    }
//
//    @GetMapping("/couponsbycompany/{companyId}")
//    public List<Coupon> getCouponsByCompanyId(@PathVariable int companyId) {
//        return customerService.getCouponsByCompanyId(companyId);
//    }
//
//    @GetMapping("/couponsbycompanyandcategory/{companyId}/{categoryId}")
//    public List<Coupon> getCouponsByCompanyIdAndCategoryId(@PathVariable int companyId,
//                                                           @PathVariable int categoryId) {
//        return customerService.getCouponsByCompanyIdAndCategoryId(companyId, categoryId);
//    }
//
//    @GetMapping("/couponsbycompanyandprice/{companyId}/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByCompanyIdAndPriceBetween(@PathVariable int companyId,
//                                                             @PathVariable double minPrice, @PathVariable double maxPrice) {
//        return customerService.getCouponsByCompanyIdAndPriceBetween(companyId, minPrice, maxPrice);
//    }
//
//    @GetMapping("/couponsbycategoryandprice/{categoryId}/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByCategoryIdAndPriceBetween(@PathVariable int categoryId,
//                                                              @PathVariable double minPrice, @PathVariable double maxPrice) {
//        return customerService.getCouponsByCategoryIdAndPriceBetween(categoryId, minPrice, maxPrice);
//    }
//
//    @GetMapping("/couponsbycomapnyandcategoryandprice/{companyId}/{categoryId}/{minPrice}/{maxPrice}")
//    public List<Coupon> getCouponsByCompanyIdAndCategoryAndPriceBetween(@PathVariable int companyId,
//                                                                        @PathVariable int categoryId, @PathVariable double minPrice, @PathVariable double maxPrice) {
//        return customerService.getCouponsByCompanyIdAndCategoryAndPriceBetween(companyId, categoryId, minPrice, maxPrice);
//    }


}

