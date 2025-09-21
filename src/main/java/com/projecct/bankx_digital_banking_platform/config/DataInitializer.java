package com.projecct.bankx_digital_banking_platform.config;

import com.projecct.bankx_digital_banking_platform.account.Account;
import com.projecct.bankx_digital_banking_platform.account.repo.AccountRepo;
import com.projecct.bankx_digital_banking_platform.common.dto.UserAuth;
import com.projecct.bankx_digital_banking_platform.common.dto.repo.UserAuthRepo;
import com.projecct.bankx_digital_banking_platform.customer.Customer;
import com.projecct.bankx_digital_banking_platform.customer.repo.CustomerRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final CustomerRepo customerRepo;
    private final AccountRepo accountRepo;
    private final UserAuthRepo userAuthRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (customerRepo.count() == 0) {
            log.info("Initializing sample data...");
            
            // Create admin customer
            Customer adminCustomer = new Customer();
            adminCustomer.setId(UUID.fromString("550e8400-e29b-41d4-a716-446655440000"));
            adminCustomer.setName("John Doe");
            adminCustomer.setEmail("admin@bankx.com");
            adminCustomer.setPhone("5551234567");
            adminCustomer.setAddress("123 Main Street, New York, NY 10001");
            adminCustomer.setKycStatus(Customer.Status.VERIFIED);
            adminCustomer.setCreatedAt(LocalDateTime.now());
            
            customerRepo.save(adminCustomer);
            log.info("Created admin customer: {}", adminCustomer.getEmail());
            
            // Create UserAuth for admin customer
            UserAuth adminAuth = new UserAuth();
            adminAuth.setUsername("admin");
            adminAuth.setPassword(passwordEncoder.encode("admin123"));
            adminAuth.setRole(UserAuth.Role.ADMIN);
            adminAuth.setCustomer(adminCustomer);
            userAuthRepo.save(adminAuth);
            log.info("Created admin auth with username: {}", adminAuth.getUsername());
            
            // Create accounts for admin customer
            Account savingsAccount = new Account();
            savingsAccount.setAccountNumber("123456789012");
            savingsAccount.setAccountType(Account.AccountType.SAVINGS);
            savingsAccount.setBalance(new BigDecimal("85430.50"));
            savingsAccount.setCustomer(adminCustomer);
            accountRepo.save(savingsAccount);
            
            Account currentAccount = new Account();
            currentAccount.setAccountNumber("567890123456");
            currentAccount.setAccountType(Account.AccountType.CURRENT);
            currentAccount.setBalance(new BigDecimal("12750.25"));
            currentAccount.setCustomer(adminCustomer);
            accountRepo.save(currentAccount);
            
            Account walletAccount = new Account();
            walletAccount.setAccountNumber("901234567890");
            walletAccount.setAccountType(Account.AccountType.WALLET);
            walletAccount.setBalance(new BigDecimal("2249.75"));
            walletAccount.setCustomer(adminCustomer);
            accountRepo.save(walletAccount);
            
            Account emergencyAccount = new Account();
            emergencyAccount.setAccountNumber("345678901234");
            emergencyAccount.setAccountType(Account.AccountType.SAVINGS);
            emergencyAccount.setBalance(new BigDecimal("45680.90"));
            emergencyAccount.setCustomer(adminCustomer);
            accountRepo.save(emergencyAccount);
            
            log.info("Created 4 accounts for admin customer");
            log.info("Sample data initialization completed!");
        } else {
            log.info("Sample data already exists, skipping initialization");
        }
    }
}