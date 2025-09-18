package com.projecct.bankx_digital_banking_platform.account.repo;

import com.projecct.bankx_digital_banking_platform.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepo extends JpaRepository<Account, Integer> {
}
