package couponsProjectPhase3.factories;

import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;
import org.springframework.stereotype.Component;

import java.util.Random;
@Component
public class Factory {
    protected static final Random random = new Random();
    protected static final int NUM_OF_COMPANIES = 15;
    protected static final int NUM_OF_COUPONS_FOR_EACH_COMPANY = 10;
    protected static final int NUM_OF_CUSTOMERS = 30;
    protected static final int NUM_OF_COUPONS_FOR_EACH_CUSTOMER = 5;

    protected CompaniesRepository companiesRepository;
    protected CouponsRepository couponsRepository;
    protected CustomersRepository customersRepository;
    protected CategoriesRepository categoriesRepository;

    public Factory(CompaniesRepository companiesRepository, CouponsRepository couponsRepository, CustomersRepository customersRepository, CategoriesRepository categoriesRepository) {
        this.companiesRepository = companiesRepository;
        this.couponsRepository = couponsRepository;
        this.customersRepository = customersRepository;
        this.categoriesRepository = categoriesRepository;
    }
}
