package couponsProjectPhase3.exceptions.unallowedUpdateExceptions;

public class PasswordFormatException extends UnallowedUpdateException{
    public PasswordFormatException() {
        super("Input String does not match properly to the password format." +
                "\nA valid password contains at least 8-20 characters and at least one digit, one upper case letter, " +
                "\none lower case letter and one special character (!@#$%&*()+=^._,:'`~;-). It doesn’t contain any white space. ");
    }
}
