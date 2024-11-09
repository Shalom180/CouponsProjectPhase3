package couponsProjectPhase3.services;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;

import java.sql.SQLException;
import java.util.List;

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
    public abstract List<Category> getCategories();

}
