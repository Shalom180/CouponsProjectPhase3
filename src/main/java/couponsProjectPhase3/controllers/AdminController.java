package couponsProjectPhase3.controllers;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.services.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    private AdminService service;

    //ctor
    public AdminController(AdminService service) {
        this.service = service;
    }

    //methods
    @GetMapping("/login/{email}/{password}")
    public boolean login(@PathVariable String email, @PathVariable String password) throws EmptyValueException {
        return service.login(email, password);
    }

    @PostMapping("/company")
    public String addCompany(@RequestBody Company company) throws EmptyValueException, UnallowedUpdateException {
        service.addCompany(company);
        return company.getName() + " Was Added Successfully.";
    }

    @PutMapping("/company")
    public String updateCompany(@RequestBody Company company) throws NonexistantObjectException, EmptyValueException, UnallowedUpdateException {
        service.updateCompany(company);
        return company.getName() + " Was Updated Successfully.";
    }

    @DeleteMapping("/company/{id}")
    public String deleteCompany(@PathVariable int id) throws NonexistantObjectException {
        service.deleteCompany(id);
        return "A Company With Id Of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/companies")
    public List<Company> getAllCompanies() {
        return service.getAllCompanies();
    }

    @GetMapping("/company/{id}")
    public Company getOneCompany(@PathVariable int id) {
        return service.getOneCompany(id);
    }

    @PostMapping("/customer")
    public String addCustomer(@RequestBody Customer customer) throws EmptyValueException, UnallowedUpdateException {
        service.addCustomer(customer);
        return customer.getFirstName() + " " + customer.getLastName() + " Was Added Successfully.";
    }

    @PutMapping("/customer")
    public String updateCustomer(@RequestBody Customer customer) throws EmailFormatException, PasswordFormatException, NameException, NonexistantObjectException, EmptyValueException, AlreadyExistingValueException {
        service.updateCustomer(customer);
        return customer.getFirstName() + " " + customer.getLastName() + " Was Updated Successfully.";
    }

    @DeleteMapping("/customer/{id}")
    public String deleteCustomer(@PathVariable int id) throws NonexistantObjectException {
        service.deleteCustomer(id);
        return "A Customer With Id Of " + id + " Was Deleted Successfully.";
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    @GetMapping("/customer/{id}")
    public Customer getOneCustomer(@PathVariable int id) {
        return service.getOneCustomer(id);
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return service.getCategories();
    }

    @GetMapping("/category/{id}")
    public Category getOneCategory(@PathVariable int id) {
        return service.getOneCategory(id);
    }

    @PostMapping("/category")
    public String addCategory(@RequestBody Category category) throws EmptyValueException, UnallowedUpdateException {
        return service.addCategory(category);
    }

    public String updateCategory(Category category) throws NameException, NonexistantObjectException, EmptyValueException, AlreadyExistingValueException {
        return service.updateCategory(category);
    }



}
