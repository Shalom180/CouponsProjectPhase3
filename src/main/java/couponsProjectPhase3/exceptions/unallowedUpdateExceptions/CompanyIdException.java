package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class CompanyIdException extends UnallowedUpdateException {
    public CompanyIdException() {
        super("A coupons companyID must match the company adding it.");
    }
}
