package com.projecct.bankx_digital_banking_platform.transaction.repo;

import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TransactionRepo extends JpaRepository<Transaction,Long> {
    List<Transaction> findByAccountIdAndDateRange(Integer accountId, LocalDate start, LocalDate end);

    List<Transaction> findAllByFromAccountIdOrToAccountId(Integer accountId, Integer accountId1);

    Optional<Transaction> findByReferenceId(String referenceId);
}
