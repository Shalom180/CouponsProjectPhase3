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




    public Map<ClientService, ClientType> login(String email, String password) throws WrongEmailOrPasswordException, EmptyValueException {
        Map<ClientService, ClientType> map = new HashMap<>();
        try {
            adminService.login(email, password);
            map.put(adminService, ClientType.Administrator);
        } catch (NoSuchElementException e1) {
            try {
                companyService.login(email, password);
                map.put(companyService, ClientType.Company);
            } catch (NoSuchElementException e2) {
                try {
                    customerService.login(email, password);
                    map.put(customerService, ClientType.Customer);
                } catch (NoSuchElementException e3) {
                    throw new WrongEmailOrPasswordException();
                }
            }
        }
        return map;
    }
}
