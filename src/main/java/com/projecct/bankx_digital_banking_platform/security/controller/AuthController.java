package com.projecct.bankx_digital_banking_platform.security.controller;

import com.projecct.bankx_digital_banking_platform.common.dto.LoginRequest;
import com.projecct.bankx_digital_banking_platform.common.dto.LoginResponse;
import com.projecct.bankx_digital_banking_platform.common.dto.UserAuth;
import com.projecct.bankx_digital_banking_platform.common.dto.repo.UserAuthRepo;
import com.projecct.bankx_digital_banking_platform.customer.Customer;
import com.projecct.bankx_digital_banking_platform.customer.repo.CustomerRepo;
import com.projecct.bankx_digital_banking_platform.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomerRepo customerRepo;
    private final UserAuthRepo userAuthRepo;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Handle demo admin login
            if ("admin@bankx.com".equals(loginRequest.getEmail()) && "admin123".equals(loginRequest.getPassword())) {
                Optional<Customer> customerOpt = customerRepo.findByEmail(loginRequest.getEmail());
                if (customerOpt.isPresent()) {
                    Customer customer = customerOpt.get();
                    String token = jwtUtil.generateToken("admin");
                    
                    LoginResponse response = LoginResponse.builder()
                            .token(token)
                            .user(customer)
                            .message("Login successful")
                            .build();
                    
                    return ResponseEntity.ok(response);
                }
            }
            
            // For regular users, find by email first
            Optional<Customer> customerOpt = customerRepo.findByEmail(loginRequest.getEmail());
            if (customerOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
            
            Customer customer = customerOpt.get();
            
            // Find the UserAuth record for this customer
            Optional<UserAuth> userAuthOpt = userAuthRepo.findByCustomer(customer);
            if (userAuthOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Invalid credentials");
            }
            
            UserAuth userAuth = userAuthOpt.get();
            
            // Authenticate using username and password
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userAuth.getUsername(), loginRequest.getPassword())
            );
            
            if (authentication.isAuthenticated()) {
                // Generate JWT token
                String token = jwtUtil.generateToken(userAuth.getUsername());
                
                LoginResponse response = LoginResponse.builder()
                        .token(token)
                        .user(customer)
                        .message("Login successful")
                        .build();
                
                return ResponseEntity.ok(response);
            }
            
            return ResponseEntity.badRequest().body("Invalid credentials");
            
        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Login error: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // In a real application, you might want to blacklist the token
        return ResponseEntity.ok().body("Logout successful");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            String email = authentication.getName();
            Optional<Customer> customer = customerRepo.findByEmail(email);
            if (customer.isPresent()) {
                return ResponseEntity.ok(customer.get());
            }
        }
        return ResponseEntity.badRequest().body("User not found");
    }
}