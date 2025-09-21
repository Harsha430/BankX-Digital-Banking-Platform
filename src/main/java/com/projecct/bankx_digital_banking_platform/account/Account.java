package com.projecct.bankx_digital_banking_platform.account;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.projecct.bankx_digital_banking_platform.customer.Customer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.security.SecureRandom;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "accounts")
public class Account {

    public enum AccountType {
        SAVINGS, CURRENT, WALLET
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false, length = 12)
    private String accountNumber;

    @Enumerated(EnumType.STRING)
    private AccountType accountType;

    private BigDecimal balance;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Customer customer;

    // Auto-generate a 12-digit numeric account number before insert
    @PrePersist
    private void generateAccountNumber() {
        if (accountNumber == null) {
            accountNumber = generateRandom12DigitNumber();
        }
    }

    private String generateRandom12DigitNumber() {
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 12; i++) {
            sb.append(random.nextInt(10));
        }
        return sb.toString();
    }
}
