package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.beans.TokenProps;
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
    public String addCompany(@RequestBody Company company, @RequestHeader("Authorization") String authorisation) throws EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        service.addCompany(company);
        return company.getName() + " Was Added Successfully.";
    }

    @PutMapping("/company")
    public String updateCompany(@RequestBody Company company, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException, EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        service.updateCompany(company);
        return company.getName() + " Was Updated Successfully.";
    }

    @DeleteMapping("/company/{id}")
    public String deleteCompany(@PathVariable int id, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        service.deleteCompany(id);
        return "A Company With Id Of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/companies")
    public List<Company> getAllCompanies(@RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.getAllCompanies();
    }

    @GetMapping("/company/{id}")
    public Company getOneCompany(@PathVariable int id, @RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.getOneCompany(id);
    }

    @PostMapping("/customer")
    public String addCustomer(@RequestBody Customer customer, @RequestHeader("Authorization") String authorisation) throws EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        service.addCustomer(customer);
        return customer.getFirstName() + " " + customer.getLastName() + " Was Added Successfully.";
    }

    @PutMapping("/customer")
    public String updateCustomer(@RequestBody Customer customer, @RequestHeader("Authorization") String authorisation) throws EmailFormatException, PasswordFormatException, NameException, NonexistantObjectException, EmptyValueException, AlreadyExistingValueException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        service.updateCustomer(customer);
        return customer.getFirstName() + " " + customer.getLastName() + " Was Updated Successfully.";
    }

    @DeleteMapping("/customer/{id}")
    public String deleteCustomer(@PathVariable int id, @RequestHeader("Authorization") String authorisation) throws NonexistantObjectException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        service.deleteCustomer(id);
        return "A Customer With Id Of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers(@RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.getAllCustomers();
    }

    @GetMapping("/customer/{id}")
    public Customer getOneCustomer(@PathVariable int id, @RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.getOneCustomer(id);
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories(@RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.getCategories();
    }

    @GetMapping("/category/{id}")
    public Category getOneCategory(@PathVariable int id, @RequestHeader("Authorization") String authorisation) {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.getOneCategory(id);
    }

    @PostMapping("/category")
    public String addCategory(@RequestBody Category category, @RequestHeader("Authorization") String authorisation) throws EmptyValueException, UnallowedUpdateException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.addCategory(category);
    }

    public String updateCategory(Category category, @RequestHeader("Authorization") String authorisation) throws NameException, NonexistantObjectException, EmptyValueException, AlreadyExistingValueException {
        AdminService service = (AdminService) activeTokens.get(authorisation).getClientService();
        return service.updateCategory(category);
    }



}
