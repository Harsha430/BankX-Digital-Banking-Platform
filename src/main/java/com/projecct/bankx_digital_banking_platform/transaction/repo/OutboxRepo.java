package com.projecct.bankx_digital_banking_platform.transaction.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projecct.bankx_digital_banking_platform.outbox.OutboxEvent;
public interface OutboxRepo extends JpaRepository<OutboxEvent,Long> {
}
