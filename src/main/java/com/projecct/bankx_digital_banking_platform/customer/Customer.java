package com.projecct.bankx_digital_banking_platform.customer;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {

    public enum Status {
        VERIFIED,
        PENDING
    }

    @Id
    private UUID id;
    @NotBlank
    private String name;
    @Email
    private String email;
    private String phone;
    private String address;
    @Enumerated(EnumType.STRING)
    private Status kycStatus;

    private LocalDateTime createdAt;
}
