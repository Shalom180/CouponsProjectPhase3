package couponsProjectPhase3.services;

import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;

import java.sql.SQLException;

public abstract class ClientService {
    protected CompaniesRepository companiesRepository;
    protected CouponsRepository couponsRepository;
    protected CustomersRepository customersRepository;
    protected CategoriesRepository categoriesRepository;

    //ctor
    public ClientService(CompaniesRepository companiesRepository, CouponsRepository couponsRepository, CustomersRepository customersRepository, CategoriesRepository categoriesRepository) {
        this.companiesRepository = companiesRepository;
        this.couponsRepository = couponsRepository;
        this.customersRepository = customersRepository;
        this.categoriesRepository = categoriesRepository;
    }

    //methods
    public abstract boolean login(String email, String password) throws NonPositiveValueException, EmailFormatException, NegativeValueException, PasswordFormatException, SQLException, DateException, EmptyValueException, NameException, EmptyValueException;

}
