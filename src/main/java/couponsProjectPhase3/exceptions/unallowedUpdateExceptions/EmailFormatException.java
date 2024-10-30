package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class EmailFormatException extends UnallowedUpdateException {
    public EmailFormatException() {
        super("Input String does not match properly to the email format.");
    }

}
