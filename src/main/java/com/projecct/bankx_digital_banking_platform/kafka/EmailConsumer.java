package com.projecct.bankx_digital_banking_platform.kafka;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projecct.bankx_digital_banking_platform.notification.EmailService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailConsumer {

    private final EmailService emailService;

    public EmailConsumer(EmailService emailService) {
        this.emailService = emailService;
    }
    @KafkaListener(topics = "account.events", groupId = "email-service")
    public void consume(String messageJson) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> data = mapper.readValue(messageJson, new TypeReference<Map<String, String>>() {});

        String name = data.get("name");
        String email = data.get("email");
        String accountNumber = data.get("accountNumber");

        emailService.sendEmail(
                email,
                "Welcome to BankX, " + name,
                "Your account " + accountNumber + " has been successfully created."
        );
    }

}
