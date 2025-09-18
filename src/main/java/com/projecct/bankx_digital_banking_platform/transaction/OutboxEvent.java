package com.projecct.bankx_digital_banking_platform.outbox;

import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "outbox_events")
public class OutboxEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique ID for this event

    private String aggregateType; // e.g., "Transaction", "Account"
    private String aggregateId;   // e.g., transaction referenceId, accountId

    private String type;          // Type of event, e.g., "TRANSFER_INITIATED", "TRANSACTION_SUCCESS"

    @Column(columnDefinition = "TEXT")
    private String payload;       // JSON string of event data

    private Transaction.Status status;        // PENDING, SENT, FAILED

    private LocalDateTime createdAt = LocalDateTime.now(); // Timestamp

    private LocalDateTime sentAt; // When the event was successfully sent
}
