package couponsProjectPhase3.beans;

import jakarta.persistence.*;

import java.sql.Date;
import java.util.Set;

@Entity
@Table(name = "coupons")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(nullable = false)
    private Company company;
    @ManyToOne
    @JoinColumn(nullable = false)
    private Category category;
    @Column(nullable = false)
    private String title, description;
    @Column(nullable = false)
    private Date startDate, endDate;
    private int amount;
    private double price;
    private String image;
    @ManyToMany(mappedBy = "coupons")
    private Set<Customer> customers;

    //ctors
    public Coupon() {
    }

    //for adding a new item to DB (insert), the SQL DB will create the new id on its own.
    public Coupon(Company company, Category category, String title, String description, Date startDate, Date endDate, int amount, double price, String image, Set<Customer> customers) {
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
        this.customers = customers;
    }

    //setters & getters
    public int getId() {
        return id;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Set<Customer> getCustomers() {
        return customers;
    }

    public void setPurchasingCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    //methods
    @Override
    public String toString() {
        return "Coupon{" +
                "id=" + id +
                ", company=" + company.getName() +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                ", price=" + price +
                ", image='" + image + '\'' +
                '}';
    }
}
