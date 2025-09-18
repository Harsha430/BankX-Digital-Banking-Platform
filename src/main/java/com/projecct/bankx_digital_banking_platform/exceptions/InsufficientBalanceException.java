package com.projecct.bankx_digital_banking_platform.exceptions;

public class InsufficientBalanceException extends Throwable {
    public InsufficientBalanceException(String insufficientBalance) {
        super(insufficientBalance);
    }
}
