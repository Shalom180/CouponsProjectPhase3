package couponsProjectPhase3.repositories;

import couponsProjectPhase3.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CompaniesRepository extends JpaRepository<Company, Integer> {
    boolean existsByName(String name);

    boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query(value = "DELETE cc FROM customers_coupons cc JOIN coupons c ON cc.coupons_id = c.id WHERE c.company_id =?1",
    nativeQuery = true)
    void deleteCouponsPurchaseHistory(int companyID);

    Optional<Company> findByEmailAndPassword(String email, String password);
}
