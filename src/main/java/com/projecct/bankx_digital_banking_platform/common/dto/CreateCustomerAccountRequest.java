package com.projecct.bankx_digital_banking_platform.common.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateCustomerAccountRequest {

    // Customer info
    @NotBlank
    private String name;
    @Email
    private String email;
    private String address;
    private Short phone;

    // UserAuth info
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
