package com.farmkart.dto; 
import jakarta.validation.constraints.*; 
public record RegisterRequest(@NotBlank(message="Name is required") String name,
@Email(message="Enter a valid email")
 @NotBlank String email,@Size(min=6,message="Password must be at least 6 characters") String password){}
