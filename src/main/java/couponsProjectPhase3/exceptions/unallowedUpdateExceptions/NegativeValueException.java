package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class NegativeValueException extends UnallowedUpdateException{
    public NegativeValueException() {
        super("Input value must not be negative.");
    }
}
