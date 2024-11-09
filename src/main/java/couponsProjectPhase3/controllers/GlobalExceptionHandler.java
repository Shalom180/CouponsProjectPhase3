package couponsProjectPhase3.controllers;

import couponsProjectPhase3.exceptions.NonexistantObjectException;
import couponsProjectPhase3.exceptions.WrongEmailOrPasswordException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.EmptyValueException;
import couponsProjectPhase3.exceptions.unallowedUpdateExceptions.UnallowedUpdateException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.HttpStatus;

import java.util.NoSuchElementException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UnallowedUpdateException.class)
    public ResponseEntity<String> handleUnallowedUpdate(UnallowedUpdateException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler(WrongEmailOrPasswordException.class)
    public ResponseEntity<String> handleWrongEmailOrPassword(WrongEmailOrPasswordException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler({NonexistantObjectException.class, NoSuchElementException.class})
    public ResponseEntity<String> handleNotFound(NonexistantObjectException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

}
