package couponsProjectPhase3.factories;

import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.EmailFormatException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.NameException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.PasswordFormatException;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Random;

@Component
public class CustomersFactory extends Factory{

    //ctor

    public CustomersFactory(CompaniesRepository companiesRepository, CouponsRepository couponsRepository, CustomersRepository customersRepository, CategoriesRepository categoriesRepository) {
        super(companiesRepository, couponsRepository, customersRepository, categoriesRepository);
    }

    public Customer createCustomer(List<Company> companies) throws EmailFormatException, PasswordFormatException,
            NameException {
        Random random = new Random();
        String firstName = FirstName.values()[random.nextInt(FirstName.values().length)].toString();
        String lastName = LastName.values()[random.nextInt(LastName.values().length)].toString();
        String email = firstName.toLowerCase() + "." + lastName.toLowerCase() + "@" +
                EmailProvider.values()[random.nextInt(EmailProvider.values().length)] + ".com";
        String password = Password.array[random.nextInt(Password.array.length)];

        return new Customer(firstName, lastName, email, password, null);
    }
}
