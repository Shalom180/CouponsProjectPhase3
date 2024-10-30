package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class EmptyValueException extends Exception {
    public EmptyValueException() {
        super("A null or empty value was entered where it is not allowed.");
    }
}
