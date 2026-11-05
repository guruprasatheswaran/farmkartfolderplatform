package com.farmkart.service;

import com.farmkart.dto.LoginRequest;
import com.farmkart.dto.RegisterRequest;
import com.farmkart.dto.UserResponse;
import com.farmkart.entity.User;
import com.farmkart.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder encoder;

    public AuthService(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder; 
    } 

    public UserResponse register(RegisterRequest r) { 

        if (users.findByEmailIgnoreCase(r.email().trim()).isPresent()) {
            throw new IllegalArgumentException(
                    "An account already exists for this email."
            );
        }

        User u = new User(); 

        u.setName(r.name().trim());
        u.setEmail(r.email().trim().toLowerCase());
        u.setPassword(encoder.encode(r.password()));

        u = users.save(u);

        return new UserResponse(
                u.getId(),
                u.getName(),
                u.getEmail()
        );
    }

    public UserResponse login(LoginRequest r) {

        User u = users.findByEmailIgnoreCase(r.email().trim())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Invalid email or password."
                        )
                );

        if (!encoder.matches(r.password(), u.getPassword())) {
            throw new IllegalArgumentException(
                    "Invalid email or password."
            );
        }

        return new UserResponse(
                u.getId(),
                u.getName(),
                u.getEmail()
        );
    }
}