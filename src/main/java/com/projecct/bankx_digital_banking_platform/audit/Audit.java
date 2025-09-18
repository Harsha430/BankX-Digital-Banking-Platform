package com.projecct.bankx_digital_banking_platform.audit;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "audit_logs")
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique audit record ID

    private String entityName; // e.g., "Transaction", "Account"

    private String entityId; // ID of the entity that changed (Transaction ID, Account ID)

    private String action; // CREATE, UPDATE, DELETE

    private String changedBy; // User or system that made the change

    @Column(columnDefinition = "TEXT")
    private String oldValue; // JSON or text of old state (optional)

    @Column(columnDefinition = "TEXT")
    private String newValue; // JSON or text of new state (optional)

    private LocalDateTime timestamp; // When this change happened

    @PrePersist
    public void prePersist() {
        timestamp = LocalDateTime.now();
    }
}
