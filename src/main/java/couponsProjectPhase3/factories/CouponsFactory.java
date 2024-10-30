package couponsProjectPhase3.factories;

import couponsProjectPhase3.beans.Category;
import couponsProjectPhase3.beans.Company;
import couponsProjectPhase3.beans.Coupon;
import couponsProjectPhase3.repositories.CategoriesRepository;
import couponsProjectPhase3.repositories.CompaniesRepository;
import couponsProjectPhase3.repositories.CouponsRepository;
import couponsProjectPhase3.repositories.CustomersRepository;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Component
public class CouponsFactory extends Factory {

    //ctor
    public CouponsFactory(CompaniesRepository companiesRepository, CouponsRepository couponsRepository, CustomersRepository customersRepository, CategoriesRepository categoriesRepository) {
        super(companiesRepository, couponsRepository, customersRepository, categoriesRepository);
    }

    public Coupon createCoupon(Company company, int couponIndex)  {
        List<Category> categories = categoriesRepository.findAll();
        Category category= categories.get(random.nextInt(categories.size()));

        String title = company.getName()  + "'s Coupon " + couponIndex;
        Date startDate = Date.valueOf(LocalDate.of(random.nextInt(2023, 2025),
                random.nextInt(12) + 1 , random.nextInt(1, 29)));
        LocalDate localEndDate = startDate.toLocalDate().plusDays(random.nextInt(1, 200));
        Date endDate = Date.valueOf(localEndDate);
//        Date startDate = Date.valueOf("2023-05-18");
//        Date endDate = Date.valueOf("2024-05-18");

        int amount = random.nextInt(1, 100);

        double price = random.nextInt(10000) / 100.0;

        String description = title + " is a coupon that starts on " + startDate + " and ends on " + endDate +
                ". It costs " + price + " and has an amount of " + amount + ".";
        String image = null;
        return new Coupon(company, category, title, description, startDate, endDate, amount, price, image, null);
    }
}



//    public static ArrayList<Coupon> createCouponArrayList(int companyID, int size) throws NonPositiveValueException, NegativeValueException, DateException, EmptyValueException {
//        ArrayList<Coupon> arrayList = new ArrayList<>();
//        for (int i = 1; i <= size; i++) {
//            arrayList.add(createCoupon(companyID, i));
//        }
//        return arrayList;
//    }
//}
