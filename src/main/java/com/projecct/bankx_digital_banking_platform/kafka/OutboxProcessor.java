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

        System.out.println("Found " + pendingEvents.size() + " pending events to process");

        for (OutboxEvent event : pendingEvents) {
            try {
                String topic = event.getAggregateType().toLowerCase() + ".events";
                System.out.println("Sending event to topic: " + topic + " with payload: " + event.getPayload());

                kafkaTemplate.send(topic, event.getPayload());
                event.setStatus(Transaction.Status.SUCCESS);
                event.setSentAt(LocalDateTime.now());
                outboxRepo.save(event);

                System.out.println("Successfully sent event ID: " + event.getId());
            } catch (Exception e) {
                System.err.println("Failed to send event ID: " + event.getId() + " - Error: " + e.getMessage());
                e.printStackTrace();
                event.setStatus(Transaction.Status.FAILED);
                outboxRepo.save(event);
            }
        }
    }
}
