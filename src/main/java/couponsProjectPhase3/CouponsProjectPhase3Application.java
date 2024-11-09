package couponsProjectPhase3;

import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.EmailFormatException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.NameException;
import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.PasswordFormatException;
import couponsProjectPhase3.factories.DBFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class CouponsProjectPhase3Application {

    public static void man(String[] args) {
        ApplicationContext context = SpringApplication.run(CouponsProjectPhase3Application.class, args);
        DBFactory dbFactory = context.getBean(DBFactory.class);
        try {
            dbFactory.formatAndBuildDB();
        } catch (EmailFormatException | NameException | PasswordFormatException | NonexistantObjectException e) {
            System.out.println(e.getMessage());
        }
    }

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(CouponsProjectPhase3Application.class, args);
    }

    @Bean
    public List<String> activeAdminTokens() {
        return new ArrayList<>();
    }

    @Bean
    public List<String> activeCompanyTokens() {
        return new ArrayList<>();
    }

    @Bean
    public List<String> activeCustomerTokens() {
        return new ArrayList<>();
    }
}
