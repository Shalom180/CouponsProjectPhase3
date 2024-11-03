package couponsProjectPhase3.services;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.exceptions.*;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.*;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class CompanyService extends ClientService {
    private int companyID;

    //ctor


    public CompanyService(CompaniesRepository companiesRepository, CouponsRepository couponsRepository, CustomersRepository customersRepository, CategoriesRepository categoriesRepository) {
        super(companiesRepository, couponsRepository, customersRepository, categoriesRepository);
    }

    //methods
    @Override
    public boolean login(String email, String password) {
        Company company = companiesRepository.findByEmailAndPassword(email, password).orElse(null);
        if (company == null)
            return false;
        else {
            companyID = company.getId();
            return true;
        }
    }

    public void addCoupon(Coupon coupon) throws NegativeValueException, DateException, EmptyValueException,
            AlreadyExistingValueException, CompanyIdException, UnallowedUpdateException, NonexistantObjectException {
        //checking for empty values
        if (coupon == null || coupon.getTitle() == null || coupon.getTitle().isEmpty() || coupon.getCompany() == null ||
                coupon.getDescription() == null || coupon.getDescription().isEmpty() || coupon.getCategory() == null)
            throw new EmptyValueException();

        //we can't add a coupon with an id other than 0 because it is auto-generated and not picked by the user
        if (coupon.getId() != 0)
            throw new UnallowedUpdateException();

        if (coupon.getAmount() < 0 || coupon.getPrice() < 0)
            throw new NegativeValueException();

        if (coupon.getStartDate().after(coupon.getEndDate()))
            throw new DateException();

        //we cannot add a coupon with a company id not matching the company adding it, that way we also check if that
        // company actually exists
        if (coupon.getCompany().getId() != companyID)
            throw new CompanyIdException();

        //we'll check if the coupons category actually exists
        if (!categoriesRepository.existsById(coupon.getCategory().getId()))
            throw new NonexistantObjectException();

        //we cannot add a coupon with a name matching an existing coupon from the same company
        if (couponsRepository.existsByTitle(coupon.getTitle()))
            throw new AlreadyExistingValueException();


        couponsRepository.save(coupon);
    }

    public void updateCoupon(Coupon coupon) throws UnallowedUpdateException, EmptyValueException, NegativeValueException,
            DateException, AlreadyExistingValueException,
            NonexistantObjectException {
        //checking for empty values
        if (coupon == null || coupon.getTitle() == null || coupon.getTitle().isEmpty() || coupon.getCompany() == null ||
                coupon.getDescription() == null || coupon.getDescription().isEmpty() || coupon.getCategory() == null)
            throw new EmptyValueException();

        //we cannot update coupon id or company id
        if (coupon.getCompany().getId() != companyID)
            throw new UnallowedUpdateException();

        //we cannot update a nonexistant coupon
        if (!couponsRepository.existsById(coupon.getId()))
            throw new NonexistantObjectException();

        if (coupon.getAmount() < 0 || coupon.getPrice() < 0)
            throw new NegativeValueException();

        if (coupon.getStartDate().after(coupon.getEndDate()))
            throw new DateException();

        //we'll check if the coupons category actually exists
        if (!categoriesRepository.existsById(coupon.getCategory().getId()))
            throw new NonexistantObjectException();

        ///we cannot add a coupon with a name matching an existing coupon from the same company
        //we'll first check if the title was even changed and if so we'll look for matching values
        if (!coupon.getTitle().equals(couponsRepository.findById(coupon.getId()).get().getTitle()))
            if (couponsRepository.existsByTitle(coupon.getTitle()))
                throw new AlreadyExistingValueException();

        couponsRepository.save(coupon);
    }

    public void deleteCoupon(int couponId) throws SQLException, CompanyIdException, NonPositiveValueException,
            NegativeValueException, DateException, EmptyValueException, NonexistantObjectException {
        //we cannot delete a nonexistent coupon
        Coupon coupon = couponsRepository.findById(couponId).orElseThrow(NonexistantObjectException::new);

        //we cannot delete a coupon not belonging to the company
        if (coupon.getCompany().getId() != companyID)
            throw new CompanyIdException();

        //we also have to delete the coupons purchase history
        couponsRepository.deleteCouponsPurchaseHistory(couponId);

        couponsRepository.deleteById(couponId);
    }

    //returns all the company's coupons
    public List<Coupon> getCompanyCoupons() throws NonPositiveValueException, NegativeValueException, SQLException,
            DateException, EmptyValueException {
        return couponsRepository.findAllByCompanyId(companyID);
    }

    //returns all the company's coupons in a certain category
    public List<Coupon> getCompanyCoupons(Category category) {
        return couponsRepository.findAllByCompanyAndCategory(companiesRepository.findById(companyID).get(), category);
    }

    //returns all the company's coupons below a certain price
    public List<Coupon> getCompanyCoupons(double minPrice, double maxPrice) {
        return couponsRepository.findAllByCompanyAndPriceBetween(companyID, minPrice, maxPrice);
    }

    public Company getCompanyDetails() {
        return companiesRepository.findById(companyID).get();
    }

    public List<Category> getCategories() {
        return categoriesRepository.findAll();
    }

}
