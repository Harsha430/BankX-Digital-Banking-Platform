package com.projecct.bankx_digital_banking_platform.transaction.controller;

import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import com.projecct.bankx_digital_banking_platform.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactions());
    }

    @GetMapping("/reference/{referenceId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Transaction> getTransactionByReferenceId(@PathVariable String referenceId) {
        try {
            Transaction transaction = transactionService.getTransactionByReferenceId(referenceId);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/account/{accountId}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<Transaction>> getTransactionsByAccountId(@PathVariable Integer accountId) {
        return ResponseEntity.ok(transactionService.getTransactionsByAccount(accountId));
    }

    @PostMapping("/deposit")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> deposit(@RequestParam Integer accountId, @RequestParam BigDecimal amount) {
        try {
            var result = transactionService.deposit(accountId, amount);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Deposit failed: " + e.getMessage());
        }
    }

    @PostMapping("/withdraw")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> withdraw(@RequestParam Integer accountId, @RequestParam BigDecimal amount) {
        try {
            var result = transactionService.withdraw(accountId, amount);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Withdrawal failed: " + e.getMessage());
        }
    }

    @PostMapping("/transfer")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> transfer(@RequestParam Integer fromAccountId, 
                                    @RequestParam Integer toAccountId, 
                                    @RequestParam BigDecimal amount) {
        try {
            var result = transactionService.transfer(fromAccountId, toAccountId, amount);
            return ResponseEntity.ok(result);
        } catch (com.projecct.bankx_digital_banking_platform.exceptions.InsufficientBalanceException e) {
            return ResponseEntity.badRequest().body("Insufficient balance: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Transfer failed: " + e.getMessage());
        }
    }
}