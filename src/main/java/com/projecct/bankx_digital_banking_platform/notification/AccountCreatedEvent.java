package com.projecct.bankx_digital_banking_platform.notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountCreatedEvent {
    private String customerName;
    private String customerEmail;
    private String accountNumber;

}
