package com.projecct.bankx_digital_banking_platform.customer.reop;

import com.projecct.bankx_digital_banking_platform.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CustomerRepo extends JpaRepository<Customer, UUID> {
}
