package com.projecct.bankx_digital_banking_platform.account.service;

import com.projecct.bankx_digital_banking_platform.account.Account;
import com.projecct.bankx_digital_banking_platform.account.repo.AccountRepo;
import com.projecct.bankx_digital_banking_platform.customer.Customer;
import com.projecct.bankx_digital_banking_platform.customer.repo.CustomerRepo;
import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import com.projecct.bankx_digital_banking_platform.transaction.repo.OutboxRepo;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.projecct.bankx_digital_banking_platform.transaction.OutboxEvent;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepo accountRepo;
    private final CustomerRepo customerRepo;
    private final OutboxRepo outboxRepo;

    private final ApplicationEventPublisher applicationEventPublisher;

    public AccountService(AccountRepo accountRepo, CustomerRepo customerRepo, OutboxRepo outboxRepo, ApplicationEventPublisher applicationEventPublisher) {
        this.accountRepo = accountRepo;
        this.customerRepo = customerRepo;
        this.outboxRepo = outboxRepo;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    // 1️⃣ Create a new account for an existing customer
    @Transactional
    @CacheEvict(value = "accountsByCustomer", key = "#customerId")
    public Account createAccount(UUID customerId, Account.AccountType accountType, BigDecimal initialBalance) {
        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Account account = new Account();
        account.setCustomer(customer);
        account.setAccountType(accountType);
        account.setBalance(initialBalance != null ? initialBalance : BigDecimal.ZERO);
        Account saved = accountRepo.save(account);

        //? for Kafka
        OutboxEvent event = new OutboxEvent();
        event.setAggregateType("Account");
        event.setAggregateId(saved.getId().toString());
        event.setType("ACCOUNT_CREATED");
        event.setPayload(
                "{ \"name\": \"" + customer.getName() + "\", " +
                        "\"email\": \"" + customer.getEmail() + "\", " +
                        "\"accountNumber\": \"" + saved.getAccountNumber() + "\" }"
        );
        event.setStatus(Transaction.Status.PENDING);
        outboxRepo.save(event);

        return saved;
    }

    // 2️⃣ Get account by ID
    @Cacheable(value = "accountById", key = "#accountId")
    public Account getAccountById(Integer accountId) {
        return accountRepo.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    // 3️⃣ Get all accounts of a customer
    @Cacheable(value = "accountsByCustomer", key = "#customerId")
    public List<Account> getAccountsByCustomer(UUID customerId) {
        return accountRepo.findByCustomerId(customerId);
    }

    // 4️⃣ Get account by account number
    @Cacheable(value = "accountByNumber", key = "#accountNumber")
    public Account getAccountByNumber(String accountNumber) {
        return accountRepo.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new RuntimeException("Account not found"));
    }

    // 4️⃣ Update account type (e.g., upgrade from SAVINGS to CURRENT)
    @CachePut(value = "accountById", key = "#accountId")
    @CacheEvict(value = "accountsByCustomer", key = "#result.customer.id")
    @Transactional
    public Account updateAccountType(Integer accountId, Account.AccountType accountType) {
        Account account = getAccountById(accountId);
        account.setAccountType(accountType);
        return accountRepo.save(account);
    }

    // 5️⃣ Update balance (internal method, usually called from TransactionService)
    @Transactional
    @CachePut(value = "accountById", key = "#accountId")
    public Account updateBalance(Integer accountId, BigDecimal newBalance) {
        Account account = getAccountById(accountId);
        account.setBalance(newBalance);
        return accountRepo.save(account);
    }

//    @CacheEvict(value = "accountsByCustomer", allEntries = true) // customer-specific might not be known
    @Transactional
    @CacheEvict(value = "accountById", key = "#accountId")
    public void deleteAccount(Integer accountId) {
        Account account = getAccountById(accountId);
        accountRepo.delete(account);
    }
    // 6️⃣ Delete account (optional, soft delete recommended in banking)
}
