package com.projecct.bankx_digital_banking_platform.transaction.reop;

import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepo extends JpaRepository<Transaction,Long> {
}
