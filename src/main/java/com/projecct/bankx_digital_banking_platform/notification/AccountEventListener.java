package com.projecct.bankx_digital_banking_platform.notification;

import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.transaction.event.TransactionPhase;

@Component
public class AccountEventListener {

    private final EmailService emailService;

    public AccountEventListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleAccountCreated(AccountCreatedEvent event) {
        String subject = "Welcome to BankX!";
        String body = "Hi " + event.getCustomerName() + ",\n" +
                "Your account " + event.getAccountNumber() + " has been created successfully.";
        emailService.sendEmail(event.getCustomerEmail(), subject, body);
    }
}
