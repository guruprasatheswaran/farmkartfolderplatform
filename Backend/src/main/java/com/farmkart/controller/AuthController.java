package com.farmkart.controller; 
import com.farmkart.dto.*;
 import com.farmkart.service.AuthService;
import jakarta.validation.Valid; 
import org.springframework.http.*;
   import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService auth;

    public AuthController(AuthService auth) {
        this.auth = auth;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest r) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(auth.register(r));
    }

    @PostMapping("/login")
    public UserResponse login(
            @Valid @RequestBody LoginRequest r) {

        return auth.login(r);
    }
}