package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class UnavailableCouponException extends UnallowedUpdateException {
    public UnavailableCouponException() {
        super("A customer cannot purchase a coupon whose quantity is below one or end date has already passed.");
    }
}
