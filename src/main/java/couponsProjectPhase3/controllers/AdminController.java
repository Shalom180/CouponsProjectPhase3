package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.*;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.services.AdminService;
import io.swagger.v3.oas.annotations.headers.Header;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private Map<String, TokenProps> activeTokens;

    //ctor
    public AdminController(Map<String, TokenProps> activeTokens) {
        this.activeTokens = activeTokens;
    }

    //methods
    @PostMapping("/company")
    public Company addCompany(@RequestBody Company company, @RequestHeader("Authorization") String authorisation) throws EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.addCompany(company);
    }

    @PutMapping("/company")
    public Company updateCompany(@RequestBody Company company, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException, EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.updateCompany(company);
    }

    @DeleteMapping("/company/{id}")
    public String deleteCompany(@PathVariable int id, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        service.deleteCompany(id);
        return "A Company With Id Of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/companies")
    public List<Company> getAllCompanies(@RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getAllCompanies();
    }

    @GetMapping("/company/{id}")
    public Company getOneCompany(@PathVariable int id, @RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getOneCompany(id);
    }

    @PostMapping("/customer")
    public Customer addCustomer(@RequestBody Customer customer, @RequestHeader("Authorization") String authorisation) throws EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.addCustomer(customer);
    }

    @PutMapping("/customer")
    public Customer updateCustomer(@RequestBody Customer customer, @RequestHeader("Authorization") String authorisation) throws EmailFormatException, PasswordFormatException, NameException, NonexistantObjectException, EmptyValueException, AlreadyExistingValueException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.updateCustomer(customer);
    }

    @DeleteMapping("/customer/{id}")
    public String deleteCustomer(@PathVariable int id, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        service.deleteCustomer(id);
        return "A Customer With Id Of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers(@RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getAllCustomers();
    }

    @GetMapping("/customer/{id}")
    public Customer getOneCustomer(@PathVariable int id, @RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getOneCustomer(id);
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories(@RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getCategories();
    }

    @GetMapping("/category/{id}")
    public Category getOneCategory(@PathVariable int id, @RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getOneCategory(id);
    }

    @PostMapping("/category")
    public Category addCategory(@RequestBody Category category, @RequestHeader("Authorization") String authorisation) throws EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.addCategory(category);
    }

    @PutMapping("/category")
    public Category updateCategory(Category category, @RequestHeader("Authorization") String authorisation) throws NameException, NonexistantObjectException, EmptyValueException, AlreadyExistingValueException {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.updateCategory(category);
    }

    @GetMapping()
    public Admin getAdminDetails(@RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation.replace("Bearer ", "")).getClientService();
        return service.getAdminDetails();
    }



}
