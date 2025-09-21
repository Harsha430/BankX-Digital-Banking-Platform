package com.projecct.bankx_digital_banking_platform.transaction.repo;

import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TransactionRepo extends JpaRepository<Transaction,Long> {
    @Query("SELECT t FROM Transaction t WHERE (t.fromAccount.id = :accountId OR t.toAccount.id = :accountId) AND DATE(t.createdAt) BETWEEN :start AND :end")
    List<Transaction> findByAccountIdAndDateRange(@Param("accountId") Integer accountId, @Param("start") LocalDate start, @Param("end") LocalDate end);

    List<Transaction> findAllByFromAccountIdOrToAccountId(Integer accountId, Integer accountId1);

    Optional<Transaction> findByReferenceId(String referenceId);
}
