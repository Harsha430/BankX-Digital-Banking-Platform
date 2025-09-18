package com.projecct.bankx_digital_banking_platform.common.dto;

import com.projecct.bankx_digital_banking_platform.account.Account;
import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ledger_entries")
public class LedgerEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Auto-generated ledger entry ID

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account_id")
    private Account fromAccount; // The account money is coming from

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_account_id")
    private Account toAccount; // The account money is going to
    private String description;
    @Enumerated(EnumType.STRING)
    private Transaction.Type txnType; // DEBIT, CREDIT, TRANSFER

    private String transactionRefId;
    private BigDecimal amount; // Amount moved
    private BigDecimal toAccountBalanceAfter;
    private BigDecimal fromBalanceAfter; // Balance of the “fromAccount” after this transaction

    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TransactionDto {

        private Transaction.Status status;
        private String referenceId;
    }
}
