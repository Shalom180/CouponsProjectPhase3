package couponsProjectPhase3.exceptions;

public class WrongEmailOrPasswordException extends Throwable {
    public WrongEmailOrPasswordException() {
        super("Entered email or password are wrong.");
    }
}
