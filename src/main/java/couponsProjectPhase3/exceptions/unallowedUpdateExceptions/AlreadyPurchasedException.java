package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class AlreadyPurchasedException extends UnallowedUpdateException {
    public AlreadyPurchasedException() {
        super("A customer cannot purchase one coupon more that once.");
    }
}
