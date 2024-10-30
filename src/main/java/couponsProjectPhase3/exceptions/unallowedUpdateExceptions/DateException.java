package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class DateException extends UnallowedUpdateException {
    public DateException() {
        super("Input Date incompatible. Start date must be before end date and vice versa.");
    }
}
