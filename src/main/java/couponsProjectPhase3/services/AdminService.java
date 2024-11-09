package couponsProjectPhase3.services;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.exceptions.*;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService extends ClientService {

    //ctor
    public AdminService(CompaniesRepository companiesRepository, CouponsRepository couponsRepository,
                        CustomersRepository customersRepository, CategoriesRepository categoriesRepository) {
        super(companiesRepository, couponsRepository, customersRepository, categoriesRepository);
    }

    //methods
    public boolean login(String email, String password) throws EmptyValueException {
        if (email == null || email.isEmpty() || password == null || password.isEmpty())
            throw new EmptyValueException();
        return email.equalsIgnoreCase("admin@admin.com") && password.equals("admin");
    }

    public void addCompany(Company company) throws EmailFormatException, PasswordFormatException, EmptyValueException,
            AlreadyExistingValueException, UnallowedUpdateException {

        //we'll check whether we've got an empty value which isn't allowed to be empty
        if (company == null || company.getName() == null || company.getName().isEmpty() || company.getPassword() == null
                || company.getPassword().isEmpty() || company.getEmail() == null || company.getEmail().isEmpty())
            throw new EmptyValueException();

        //we are not allowed to insert a new company with an id other than 0 - the user cannot choose the company's id
        //because it is auto-generated
        if (company.getId() != 0)
            throw new UnallowedUpdateException();

        //we'll check whether the input email and password match our format properly
        if (!Validations.isValidEmail(company.getEmail()))
            throw new EmailFormatException();

        if (!Validations.isValidPassword(company.getPassword()))
            throw new PasswordFormatException();

        //we'll check whether there's already a company in the db with the same name or email
        if (companiesRepository.existsByEmail(company.getEmail()) || companiesRepository.existsByName(company.getName()))
            throw new AlreadyExistingValueException();

        companiesRepository.save(company);
    }

    public void updateCompany(Company company) throws EmptyValueException,
            UnallowedUpdateException, NonexistantObjectException, AlreadyExistingValueException, EmailFormatException, PasswordFormatException {
        if (company == null)
            throw new EmptyValueException();

        //we cannot update a nonexistant company - we'll check if this company actually exists
        Company companyInDB = companiesRepository.findById(company.getId()).orElse(null);

        if (companyInDB == null)
            throw new NonexistantObjectException();

        //we'll check whether we've got an empty value which isn't allowed to be empty
        if (company.getName() == null || company.getName().isEmpty() || company.getPassword() == null
                || company.getPassword().isEmpty() || company.getEmail() == null || company.getEmail().isEmpty())
            throw new EmptyValueException();

        //we'll check whether the input email and password match our format properly
        if (!Validations.isValidEmail(company.getEmail()))
            throw new EmailFormatException();

        if (!Validations.isValidPassword(company.getPassword()))
            throw new PasswordFormatException();

        //we cannot update to an email that already exists in the db -
        // we'll check first if the user is actually trying to change the company's email and then well look
        // for matching values
        if (!company.getEmail().equals(companyInDB.getEmail()) &&
                companiesRepository.existsByEmail(company.getEmail()))
            throw new AlreadyExistingValueException();

        //we are not allowed to update name
        if (!companyInDB.getName().equals(company.getName()))
            throw new UnallowedUpdateException();

        //we cannot update a company while adding it new coupons - we'll reset its coupons list
        company.setCoupons(null);

        companiesRepository.save(company);

    }

    public void deleteCompany(int companyId) throws NonexistantObjectException {
        //we cannot delete a nonexistant company
        if (!companiesRepository.existsById(companyId))
            throw new NonexistantObjectException();
        //we have to delete also the coupons issued by the company and its customer purchase history
        companiesRepository.deleteCouponsPurchaseHistory(companyId);
        couponsRepository.deleteAllCouponsByCompanyId(companyId);
        companiesRepository.deleteById(companyId);


    }

    public List<Company> getAllCompanies() {
        return companiesRepository.findAll();
    }

    public Company getOneCompany(int companyId) {
        return companiesRepository.findById(companyId).orElseThrow();
    }

    public void addCustomer(Customer customer) throws EmailFormatException,
            PasswordFormatException, NameException,
            EmptyValueException, AlreadyExistingValueException, UnallowedUpdateException {
        //we'll check for disallowed empty values
        if (customer == null || customer.getEmail() == null || customer.getEmail().isEmpty() ||
                customer.getPassword() == null || customer.getPassword().isEmpty() || customer.getFirstName() == null ||
                customer.getFirstName().isEmpty() || customer.getLastName() == null || customer.getLastName().isEmpty())
            throw new EmptyValueException();

        //we can't add a new customer that already has an id. it should be auto-generated
        if (customer.getId() != 0)
            throw new UnallowedUpdateException();

        //we'll verify the password and email format
        if (!Validations.isValidPassword(customer.getPassword()))
            throw new PasswordFormatException();
        if (!Validations.isValidEmail(customer.getEmail()))
            throw new EmailFormatException();

        //we'll check whether the customer's name is valid
        if (!Validations.onlyAlphabets(customer.getFirstName()) || !Validations.onlyAlphabets(customer.getLastName()))
            throw new NameException();


        //we mustn't add a new customer with an existing email address
        if (customersRepository.existsByEmail(customer.getEmail()))
            throw new AlreadyExistingValueException();

        customersRepository.save(customer);
    }

    public void updateCustomer(Customer customer) throws EmptyValueException, NonexistantObjectException,
            AlreadyExistingValueException, PasswordFormatException, EmailFormatException, NameException {
        //we cannot accept a null expression
        if (customer == null)
            throw new EmptyValueException();

        //we cant update a nonexistant customer
        if (!customersRepository.existsById(customer.getId()))
            throw new NonexistantObjectException();

        //we'll check for disallowed empty values
        if (customer.getEmail() == null || customer.getEmail().isEmpty() ||
                customer.getPassword() == null || customer.getPassword().isEmpty() || customer.getFirstName() == null ||
                customer.getFirstName().isEmpty() || customer.getLastName() == null || customer.getLastName().isEmpty())
            throw new EmptyValueException();

        //we cannot update a customer email to an already existing email -
        // we'll check first if the user is actually trying to change the customer's email and then well look
        // for matching values
        if (!customer.getEmail().equals(customersRepository.findById(customer.getId()).get().getEmail()) &&
                customersRepository.existsByEmail(customer.getEmail()))
            throw new AlreadyExistingValueException();

        //we'll verify the password and email format
        if (!Validations.isValidPassword(customer.getPassword()))
            throw new PasswordFormatException();
        if (!Validations.isValidEmail(customer.getEmail()))
            throw new EmailFormatException();

        //we'll check whether the customer's name is valid
        if (!Validations.onlyAlphabets(customer.getFirstName()) || !Validations.onlyAlphabets(customer.getLastName()))
            throw new NameException();

        //we cannot update customer id
        customersRepository.save(customer);
    }

    public void deleteCustomer(int customerId) throws NonexistantObjectException {
        //we cannot delete a nonexistant customer
        if (!customersRepository.existsById(customerId))
            throw new NonexistantObjectException();

        //we have to delete their coupons purchase history as well
        customersRepository.deleteCouponsPurchaseHistory(customerId);
        customersRepository.deleteById(customerId);
    }

    public List<Customer> getAllCustomers() {
        return customersRepository.findAll();
    }

    public Customer getOneCustomer(int customerId) {
        return customersRepository.findById(customerId).orElseThrow();
    }

    //todo add categories service methods
    public List<Category> getCategories() {
        return categoriesRepository.findAll();
    }

    public Category getOneCategory(int categoryId) {
        return categoriesRepository.findById(categoryId).orElseThrow();
    }

    public String addCategory(Category category) throws UnallowedUpdateException, EmptyValueException {
        //we cannot add a null value
        if (category == null)
            throw new EmptyValueException();

        //we cannot add a category that is not only alphabetical
        if (!Validations.onlyAlphabets(category.getName()))
            throw new NameException();

        //we cannot add category with an already existing name
        if(categoriesRepository.existsByName(category.getName()))
            throw new AlreadyExistingValueException();

        //we cannot add a category with a self-chosen id
        if (category.getId() != 0)
            throw new UnallowedUpdateException();

        categoriesRepository.save(category);
        return "A Category Named '" + category.getName() + "' Was added Successfully";
    }

    public String updateCategory(Category category) throws EmptyValueException, NonexistantObjectException, NameException, AlreadyExistingValueException {
        //we cannot update a null value
        if (category == null)
            throw new EmptyValueException();

        //we cannot update a nonexistant category
        if (!categoriesRepository.existsById(category.getId()))
            throw new NonexistantObjectException();

        //we cannot update a category whose name is not only alphabetical
        if (!Validations.onlyAlphabets(category.getName()))
            throw new NameException();

        //we cannot update category with an already existing name
        if(categoriesRepository.existsByName(category.getName()))
            throw new AlreadyExistingValueException();


        categoriesRepository.save(category);
        return "A Category With An Id Of '" + category.getId() + "' Was Updated Successfully";
    }

    //right now I do not want to implement a deleteCategory method because it is too risky. Categories can be deleted
    // directly through the DB
}

