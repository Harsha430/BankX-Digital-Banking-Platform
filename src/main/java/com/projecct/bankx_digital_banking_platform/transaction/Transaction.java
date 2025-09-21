package com.projecct.bankx_digital_banking_platform.transaction;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.projecct.bankx_digital_banking_platform.account.Account;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "transactions")
public class Transaction {

    public enum Type {
        DEBIT, CREDIT, TRANSFER
    }

    public enum Status {
        PENDING, SUCCESS, FAILED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_account_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Account fromAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_account_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Account toAccount;

    @Column(precision = 19, scale = 2, nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(unique = true, nullable = false, updatable = false)
    private String referenceId;


    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) {
            status = Status.PENDING;
        }
        if (referenceId == null) {
            referenceId = generateRefId();
        }
    }



    private String generateRefId() {
        String timestamp = java.time.format.DateTimeFormatter
                .ofPattern("yyyyMMddHHmmss")
                .format(LocalDateTime.now());
        return "TXN-" + timestamp + "-" + random4Digits();
    }


    private String random4Digits() {
        return String.valueOf((int)(Math.random() * 9000) + 1000);
    }
}
