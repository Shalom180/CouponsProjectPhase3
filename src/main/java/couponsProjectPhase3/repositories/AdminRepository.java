package couponsProjectPhase3.repositories;

import couponsProjectPhase3.beans.Admin;
import couponsProjectPhase3.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByEmailAndPassword(String email, String password);

}
