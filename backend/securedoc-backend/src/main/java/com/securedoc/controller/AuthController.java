package com.securedoc.controller;

import com.securedoc.entity.User;
import com.securedoc.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    // Temporary test endpoint
    @GetMapping("/test")
    public String test() {
        return "AUTH WORKING";
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        User user = new User();

        user.setUserId(request.userId());
        user.setName(request.name());
        user.setEmail(request.email());
        user.setRole("USER");

        User savedUser = userService.register(user, request.password());

        return ResponseEntity.ok(savedUser);
    }

    public record RegisterRequest(
            String userId,
            String name,
            String email,
            String password
    ) {}
}