package com.projecct.bankx_digital_banking_platform.transaction.controller;

import com.projecct.bankx_digital_banking_platform.common.dto.LedgerEntry;
import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import com.projecct.bankx_digital_banking_platform.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/transfer")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<LedgerEntry.TransactionDto> createTransaction(
            @RequestParam Integer fromAccountId,
            @RequestParam Integer toAccountId,
            @RequestParam BigDecimal amount,
            @RequestParam Transaction.Type type) {
        try {
            LedgerEntry.TransactionDto transaction = transactionService.createTransaction(
                    fromAccountId, toAccountId, amount, type);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}