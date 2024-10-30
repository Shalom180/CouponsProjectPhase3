package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class AlreadyExistingValueException extends UnallowedUpdateException {
    public AlreadyExistingValueException() {
        super("Input data already exists in the DB.");
    }
}
