package com.projecct.bankx_digital_banking_platform.kafka;

import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import com.projecct.bankx_digital_banking_platform.transaction.repo.OutboxRepo;
import jakarta.transaction.Transactional;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.projecct.bankx_digital_banking_platform.transaction.OutboxEvent;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OutboxProcessor {

    private final OutboxRepo outboxRepo;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public OutboxProcessor(OutboxRepo outboxRepo, KafkaTemplate<String, String> kafkaTemplate) {
        this.outboxRepo = outboxRepo;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Scheduled(fixedDelay = 5000) // every 5 seconds
    @Transactional
    public void processOutbox() {
        List<OutboxEvent> pendingEvents = outboxRepo.findByStatus(Transaction.Status.PENDING);

        for (OutboxEvent event : pendingEvents) {
            try {
                kafkaTemplate.send(event.getAggregateType().toLowerCase() + ".events", event.getPayload());
                event.setStatus(Transaction.Status.SUCCESS);
                event.setSentAt(LocalDateTime.now());
                outboxRepo.save(event);
            } catch (Exception e) {
                event.setStatus(Transaction.Status.FAILED);
                outboxRepo.save(event);
            }
        }
    }
}
