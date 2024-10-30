package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class UnallowedUpdateException extends Exception {
    public UnallowedUpdateException(String message) {
        super(message);
    }

    public UnallowedUpdateException() {
        super("An update of this sort is not allowed.");
    }
}
