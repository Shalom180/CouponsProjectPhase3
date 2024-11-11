package couponsProjectPhase3.services;

import couponsProjectPhase3.beans.ClientType;
import couponsProjectPhase3.exceptions.*;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.EmptyValueException;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Component
public class LoginManager {
    private final AdminService adminService;
    private final CompanyService companyService;
    private final CustomerService customerService;

    public LoginManager(AdminService adminService, CompanyService companyService, CustomerService customerService) {
        this.adminService = adminService;
        this.companyService = companyService;
        this.customerService = customerService;
    }




    public ClientService login(String email, String password) throws WrongEmailOrPasswordException, EmptyValueException {
        if (adminService.login(email, password))
            return adminService;
        else if (companyService.login(email, password))
            return companyService;
        else if (customerService.login(email, password))
            return customerService;
        else throw new WrongEmailOrPasswordException();
    }
}
