package com.projecct.bankx_digital_banking_platform.transaction.repo;

import com.projecct.bankx_digital_banking_platform.transaction.OutboxEvent;
import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutboxRepo extends JpaRepository<OutboxEvent,Long> {
    List<OutboxEvent> findByStatus(Transaction.Status status);
}
