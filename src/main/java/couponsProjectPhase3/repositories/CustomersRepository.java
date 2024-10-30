package couponsProjectPhase3.repositories;

import couponsProjectPhase3.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface CustomersRepository extends JpaRepository<Customer, Integer> {
    boolean existsByEmail(String email);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM customers_coupons WHERE customers_id=?1", nativeQuery = true)
    void deleteCouponsPurchaseHistory(int customerId);

    Optional<Customer> findByEmailAndPassword(String email, String password);
}
