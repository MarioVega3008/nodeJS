package com.nodejs.test.nodejs.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(final String message) {
        super(message);
    }
    
}
