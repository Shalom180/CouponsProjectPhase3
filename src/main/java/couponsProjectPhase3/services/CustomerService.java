package couponsProjectPhase3.services;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.beans.Customer;
import couponsProjectPhase3.exceptions.*;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class CustomerService extends ClientService {
    private int customerID;

    //ctor
    public CustomerService(CompaniesRepository companiesRepository, CouponsRepository couponsRepository,
                           CustomersRepository customersRepository, CategoriesRepository categoriesRepository) {
        super(companiesRepository, couponsRepository, customersRepository, categoriesRepository);
    }

    //methods
    public Customer login(String email, String password) {
        return customersRepository.findByEmailAndPassword(email, password).orElseThrow(()->new NoSuchElementException("Customer not found"));
    }

    public void purchaseCoupon(Coupon coupon) throws EmptyValueException, AlreadyPurchasedException, UnavailableCouponException, NonexistantObjectException {
        //method does not accept null values
        if (coupon == null)
            throw new EmptyValueException();

        //we cannot purchase a nonexistant coupon
        if (!couponsRepository.existsById(coupon.getId()))
            throw new NonexistantObjectException();

        //one customer cannot purchase a coupon more that once
        if (couponsRepository.findAllByCustomerId(customerID).contains(coupon))
            throw new AlreadyPurchasedException();

        //they cannot purchase a coupon whose quantity is zero
        if (coupon.getAmount() < 1)
            throw new UnavailableCouponException();

        //they cannot purchase the coupon if its end date has already passed
        if (coupon.getEndDate().before(new Date(System.currentTimeMillis())))
            throw new UnavailableCouponException();

        //after purchasing the coupons quantity goes down by one
        couponsRepository.addCouponPurchase(customerID, coupon.getId());
        coupon.setAmount(coupon.getAmount() - 1);
        couponsRepository.save(coupon);
    }

    public List<Coupon> getCustomerCoupons() {
        return couponsRepository.findAllByCustomerId(customerID);
    }

    public List<Coupon> getCustomerCoupons(int categoryId) {
        return couponsRepository.findAllByCustomerIdAndCategoryId(customerID, categoryId);
    }

    public List<Coupon> getCustomerCoupons(double minPrice, double maxPrice) throws NonPositiveValueException, EmailFormatException,
            NegativeValueException, PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        return couponsRepository.findAllByCustomerIdAndPriceBetween(customerID, minPrice, maxPrice);
    }

    public List<Coupon> getCoupons() {
        return couponsRepository.findAll();
    }

    public List<Coupon> getCouponsByPriceBetween(double minPrice, double maxPrice) {
        return couponsRepository.findAllByPriceBetween(minPrice, maxPrice);
    }

    public List<Coupon> getCouponsByCategoryId(int categoryId) {
        return couponsRepository.findAllByCategoryId(categoryId);
    }

    public List<Coupon> getCouponsByCompanyId(int companyId) {
        return couponsRepository.findAllByCompanyId(companyId);
    }

    public List<Coupon> getCouponsByCompanyIdAndCategoryId(int companyId, int categoryId) {
        return couponsRepository.findAllByCompanyIdAndCategoryId(companyId, categoryId);
    }

    public List<Coupon> getCouponsByCompanyIdAndPriceBetween(int companyId, double minPrice, double maxPrice) {
        return couponsRepository.findAllByCompanyIdAndPriceBetween(companyId, minPrice, maxPrice);
    }

    public List<Coupon> getCouponsByCategoryIdAndPriceBetween(int categoryId, double minPrice, double maxPrice) {
        return couponsRepository.findAllByCategoryIdAndPriceBetween(categoryId, minPrice, maxPrice);
    }

    public List<Coupon> getCouponsByCompanyIdAndCategoryAndPriceBetween(int companyId, int categoryId, double minPrice, double maxPrice) {
        return couponsRepository.findAllByCompanyIdAndCategoryIdAndPriceBetween(companyId, categoryId, minPrice, maxPrice);
    }

    public Customer getCustomerDetails() throws NonPositiveValueException, EmailFormatException, NegativeValueException,
            PasswordFormatException, NameException, SQLException, DateException, EmptyValueException {
        return customersRepository.findById(customerID).get();
    }

    public List<Category> getCategories() {
        return categoriesRepository.findAll();
    }

}
