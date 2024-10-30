package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class NonPositiveValueException extends UnallowedUpdateException {
    public NonPositiveValueException(){
        super("Set value must be positive");
    }
}
