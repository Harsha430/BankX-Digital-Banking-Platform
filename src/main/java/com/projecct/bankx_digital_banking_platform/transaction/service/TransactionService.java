package com.projecct.bankx_digital_banking_platform.transaction.service;


import com.projecct.bankx_digital_banking_platform.account.Account;
import com.projecct.bankx_digital_banking_platform.account.repo.AccountRepo;
import com.projecct.bankx_digital_banking_platform.common.dto.CreateCustomerAccountRequest;
import com.projecct.bankx_digital_banking_platform.common.dto.repo.UserAuthRepo;
import com.projecct.bankx_digital_banking_platform.customer.Customer;
import com.projecct.bankx_digital_banking_platform.customer.reop.CustomerRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.projecct.bankx_digital_banking_platform.account.Account.AccountType.SAVINGS;

@Service
public class TransactionService {

    private final CustomerRepo customerRepo;
    private  final AccountRepo accountRepo;
    private final UserAuthRepo userAuthRepo;

    public TransactionService(CustomerRepo customerRepo, AccountRepo accountRepo, UserAuthRepo userAuthRepo) {
        this.customerRepo = customerRepo;
        this.accountRepo = accountRepo;
        this.userAuthRepo = userAuthRepo;
    }

    @Transactional
    public String createAccount(CreateCustomerAccountRequest createCustomerAccountRequest){
        Customer customer = new Customer();
        customer.setName(createCustomerAccountRequest.getName());
        customer.setEmail(createCustomerAccountRequest.getEmail());
        customer.setAddress(createCustomerAccountRequest.getAddress());

        Account newAcc = new Account();
        newAcc.setBalance(1000L);
        newAcc.setAccountType(SAVINGS);
        newAcc.setCustomer();
    }
}
