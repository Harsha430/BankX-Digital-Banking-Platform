package com.projecct.bankx_digital_banking_platform.customer.repo;

import com.projecct.bankx_digital_banking_platform.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CustomerRepo extends JpaRepository<Customer, UUID> {
    Optional<Customer> findByEmail(String email);
}
