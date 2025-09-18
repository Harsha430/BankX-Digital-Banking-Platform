package com.projecct.bankx_digital_banking_platform.transaction.service;

import com.projecct.bankx_digital_banking_platform.account.Account;
import com.projecct.bankx_digital_banking_platform.account.repo.AccountRepo;
import com.projecct.bankx_digital_banking_platform.audit.Audit;
import com.projecct.bankx_digital_banking_platform.audit.AuditRepo;
import com.projecct.bankx_digital_banking_platform.common.dto.LedgerEntry;
import com.projecct.bankx_digital_banking_platform.common.dto.repo.LedgerRepo;
import com.projecct.bankx_digital_banking_platform.exceptions.InsufficientBalanceException;
import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import com.projecct.bankx_digital_banking_platform.transaction.repo.OutboxRepo;
import com.projecct.bankx_digital_banking_platform.transaction.repo.TransactionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import com.projecct.bankx_digital_banking_platform.outbox.OutboxEvent;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepo transactionRepo;
    private final AccountRepo accountRepo;
    private final AuditRepo auditRepo;
    private final LedgerRepo ledgerRepo;
    private final OutboxRepo outboxRepo;

    @Autowired
    public TransactionService(TransactionRepo transactionRepo, AccountRepo accountRepo,
                              AuditRepo auditRepo, LedgerRepo ledgerRepo, OutboxRepo outboxRepo) {
        this.transactionRepo = transactionRepo;
        this.accountRepo = accountRepo;
        this.auditRepo = auditRepo;
        this.ledgerRepo = ledgerRepo;
        this.outboxRepo = outboxRepo;
    }

    @Transactional
    public LedgerEntry.TransactionDto createTransaction(Integer fromAccountId, Integer toAccountId, BigDecimal amount, Transaction.Type type) {
        Account fromAccount = null;
        Account toAccount = null;

        if (fromAccountId != null) {
            fromAccount = accountRepo.findById(fromAccountId)
                    .orElseThrow(() -> new RuntimeException("From account not found"));
        }
        if (toAccountId != null) {
            toAccount = accountRepo.findById(toAccountId)
                    .orElseThrow(() -> new RuntimeException("To account not found"));
        }

        // Check balance for debit/transfer
        if (fromAccount != null && (type == Transaction.Type.DEBIT || type == Transaction.Type.TRANSFER)) {
            if (fromAccount.getBalance().compareTo(amount) < 0) {
                Transaction failedTxn = saveTransaction(fromAccount, toAccount, amount, type, Transaction.Status.FAILED);
                saveAudit(failedTxn, fromAccount.getCustomer().getName(), "FAILED");
                return new LedgerEntry.TransactionDto(failedTxn.getStatus(), failedTxn.getReferenceId());
            }
        }

        // Update balances
        if (type == Transaction.Type.DEBIT || type == Transaction.Type.TRANSFER) {
            fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
            accountRepo.save(fromAccount);
        }

        if (type == Transaction.Type.CREDIT || type == Transaction.Type.TRANSFER) {
            toAccount.setBalance(toAccount.getBalance().add(amount));
            accountRepo.save(toAccount);
        }

        Transaction transaction = saveTransaction(fromAccount, toAccount, amount, type, Transaction.Status.SUCCESS);
        saveAudit(transaction, fromAccount != null ? fromAccount.getCustomer().getName() : "SYSTEM", "SUCCESS");
        saveLedger(transaction, fromAccount, toAccount, amount);
        saveOutboxEvent(transaction, fromAccount, toAccount, amount);

        return new LedgerEntry.TransactionDto(transaction.getStatus(), transaction.getReferenceId());
    }

    @Transactional
    @CacheEvict(value = "transactions", key = "#accountId")
    public LedgerEntry.TransactionDto deposit(Integer accountId, BigDecimal amount) {
        return createTransaction(null, accountId, amount, Transaction.Type.CREDIT);
    }

    @Transactional
    @CacheEvict(value = "transactions", key = "#accountId")
    public LedgerEntry.TransactionDto withdraw(Integer accountId, BigDecimal amount) {
        return createTransaction(accountId, null, amount, Transaction.Type.DEBIT);
    }

    @Transactional
    @CacheEvict(value = "transactions", allEntries = true)
    public LedgerEntry.TransactionDto transfer(Integer fromAccountId, Integer toAccountId, BigDecimal amount) throws InsufficientBalanceException {
        return createTransaction(fromAccountId, toAccountId, amount, Transaction.Type.TRANSFER);
    }

    @Cacheable(value = "transactionByRef", key = "#referenceId")
    public Transaction getTransactionByReferenceId(String referenceId) {
        return transactionRepo.findByReferenceId(referenceId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    @Cacheable(value = "transactions", key = "#accountId")
    public List<Transaction> getTransactionsByAccount(Integer accountId) {
        return transactionRepo.findAllByFromAccountIdOrToAccountId(accountId, accountId);
    }

    @Cacheable(value = "transactionsByDate", key = "#accountId + '_' + #start.toString() + '_' + #end.toString()")
    public List<Transaction> getTransactionsByDateRange(Integer accountId, LocalDate start, LocalDate end) {
        return transactionRepo.findByAccountIdAndDateRange(accountId, start, end);
    }

    // ----------------- Helper Methods -----------------

    private Transaction saveTransaction(Account fromAccount, Account toAccount, BigDecimal amount,
                                        Transaction.Type type, Transaction.Status status) {
        Transaction transaction = new Transaction();
        transaction.setFromAccount(fromAccount);
        transaction.setToAccount(toAccount);
        transaction.setAmount(amount);
        transaction.setType(type);
        transaction.setStatus(status);
        return transactionRepo.save(transaction);
    }

    private void saveAudit(Transaction transaction, String changedBy, String newValue) {
        Audit audit = new Audit();
        audit.setEntityName("Transaction");
        audit.setEntityId(transaction.getReferenceId());
        audit.setAction("CREATE");
        audit.setChangedBy(changedBy);
        audit.setOldValue("N/A");
        audit.setNewValue(newValue);
        auditRepo.save(audit);
    }

    private void saveLedger(Transaction transaction, Account fromAccount, Account toAccount, BigDecimal amount) {
        LedgerEntry ledgerEntry = new LedgerEntry();
        ledgerEntry.setAmount(amount);
        ledgerEntry.setFromAccount(fromAccount);
        ledgerEntry.setToAccount(toAccount);
        ledgerEntry.setTxnType(transaction.getType());
        if (fromAccount != null) ledgerEntry.setFromBalanceAfter(fromAccount.getBalance());
        if (toAccount != null) ledgerEntry.setToAccountBalanceAfter(toAccount.getBalance());
        ledgerEntry.setTransactionRefId(transaction.getReferenceId());
        ledgerEntry.setDescription("Transaction " + transaction.getType() + " from "
                + (fromAccount != null ? fromAccount.getId() : "N/A") + " to "
                + (toAccount != null ? toAccount.getId() : "N/A"));
        ledgerRepo.save(ledgerEntry);
    }

    private void saveOutboxEvent(Transaction transaction, Account fromAccount, Account toAccount, BigDecimal amount) {
        OutboxEvent event = new OutboxEvent();
        event.setAggregateType("Transaction");
        event.setAggregateId(transaction.getReferenceId());
        event.setType(transaction.getType() + "_INITIATED");
        event.setPayload("{\"fromAccount\":\"" + (fromAccount != null ? fromAccount.getId() : null)
                + "\",\"toAccount\":\"" + (toAccount != null ? toAccount.getId() : null)
                + "\",\"amount\":" + amount + "}");
        event.setStatus(Transaction.Status.PENDING);
        outboxRepo.save(event);
    }
}
