package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class NameException extends UnallowedUpdateException{
    public NameException() {
        super("Name must be not empty or null and contain only alphabets.");
    }
}
