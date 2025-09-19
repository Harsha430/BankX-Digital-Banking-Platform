package com.projecct.bankx_digital_banking_platform.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projecct.bankx_digital_banking_platform.notification.EmailService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class TransactionEmailConsumer {

    private final EmailService emailService;

    public TransactionEmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }

    @KafkaListener(topics = "transaction.events", groupId = "email-service")
    public void consumeTransaction(String messageJson) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> data = mapper.readValue(messageJson, new TypeReference<Map<String, String>>() {});

        String fromAccount = data.get("fromAccount");
        String toAccount = data.get("toAccount");
        String amount = data.get("amount");

        emailService.sendEmail(
                data.get("email"), // recipient email
                "Transaction Alert",
                "A transaction of " + amount + " has been made from account " + fromAccount +
                        " to account " + toAccount + "."
        );
    }
}
