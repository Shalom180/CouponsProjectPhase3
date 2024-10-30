package couponsProjectPhase3.factories;

import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.EmailFormatException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.NameException;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.PasswordFormatException;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;
import couponsProjectPhase3.services.AdminService;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DBFactory extends Factory {
    private CompaniesFactory companiesFactory;
    private CouponsFactory couponsFactory;
    private CustomersFactory customersFactory;

    private AdminService adminService;

    //ctor


    public DBFactory(CompaniesRepository companiesRepository, CouponsRepository couponsRepository,
                     CustomersRepository customersRepository, CategoriesRepository categoriesRepository,
                     CompaniesFactory companiesFactory, CouponsFactory couponsFactory, CustomersFactory customersFactory,
                     AdminService adminService) {
        super(companiesRepository, couponsRepository, customersRepository, categoriesRepository);
        this.companiesFactory = companiesFactory;
        this.couponsFactory = couponsFactory;
        this.customersFactory = customersFactory;
        this.adminService = adminService;
    }

    public void dbBuilder() throws EmailFormatException, PasswordFormatException, NameException {
        List<Company> companies = new ArrayList<>();
        for (int i = 1; i < NUM_OF_COMPANIES; i++) {
            companies.add(companiesFactory.createCompany());
        }

        for (Company company : companies) {
            companiesRepository.save(company);

        }

        ArrayList<Coupon> coupons = new ArrayList<>();
        for (int i = 1; i <= NUM_OF_COMPANIES * NUM_OF_COUPONS_FOR_EACH_COMPANY; i++) {
            List<Company> allCompanies = companiesRepository.findAll();
            Company company = allCompanies.get(random.nextInt(allCompanies.size()));
            coupons.add(couponsFactory.createCoupon(company, i));
        }

        for (Coupon coupon : coupons) {
            couponsRepository.save(coupon);
        }

        ArrayList<Customer> customers = new ArrayList<>();
        for (int i = 1; i <= NUM_OF_CUSTOMERS; i++) {
            customers.add(customersFactory.createCustomer(companies));
        }

        for (Customer customer : customers) {
            customersRepository.save(customer);
        }

        for (Customer customer : customersRepository.findAll()) {
            for (int i = 0; i <= random.nextInt(NUM_OF_COUPONS_FOR_EACH_CUSTOMER); i++) {
                Coupon randomCoupon = couponsRepository.findAll().get(random.nextInt(couponsRepository.findAll().size()));
                couponsRepository.addCouponPurchase(customer.getId(), randomCoupon.getId());
            }
        }
    }

    public void formatDB() throws NonexistantObjectException {
        for (Company company : adminService.getAllCompanies()) {
            adminService.deleteCompany(company.getId());
        }

        for (Customer customer : adminService.getAllCustomers()) {
            adminService.deleteCustomer(customer.getId());
        }
    }

    public void formatAndBuildDB() throws NonexistantObjectException, EmailFormatException, PasswordFormatException,
            NameException {
        formatDB();
        dbBuilder();
    }
}
