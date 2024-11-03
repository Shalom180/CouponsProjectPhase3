package couponsProjectPhase3.beans;

import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.EmailFormatException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.NameException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.PasswordFormatException;
import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String firstName, lastName, password;
    @Column(nullable = false, unique = true)
    private String email;
    @ManyToMany
    private Set<Coupon> coupons;

    //ctors
    public Customer() {
    }

    //for insert
    public Customer(String firstName, String lastName, String password, String email, Set<Coupon> coupons) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.coupons = coupons;
    }

    //getters & setters
    public int getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Set<Coupon> getCoupons() {
        return coupons;
    }

    public void setCoupons(Set<Coupon> coupons) {
        this.coupons = coupons;
    }

    //methods
    @Override
    public String toString() {
        return "Customer{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
