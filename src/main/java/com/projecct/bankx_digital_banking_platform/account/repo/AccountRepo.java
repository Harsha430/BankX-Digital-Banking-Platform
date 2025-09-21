package com.projecct.bankx_digital_banking_platform.account.repo;

import com.projecct.bankx_digital_banking_platform.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AccountRepo extends JpaRepository<Account, Integer> {
    List<Account> findByCustomerId(UUID customerId);
    Optional<Account> findByAccountNumber(String accountNumber);
}
