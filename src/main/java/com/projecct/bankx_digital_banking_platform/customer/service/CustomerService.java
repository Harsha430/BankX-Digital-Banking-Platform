package com.projecct.bankx_digital_banking_platform.customer.service;

import com.projecct.bankx_digital_banking_platform.common.dto.CreateCustomerAccountRequest;
import com.projecct.bankx_digital_banking_platform.common.dto.UserAuth;
import com.projecct.bankx_digital_banking_platform.common.dto.UserAuth.Role;
import com.projecct.bankx_digital_banking_platform.common.dto.repo.UserAuthRepo;
import com.projecct.bankx_digital_banking_platform.customer.Customer;
import com.projecct.bankx_digital_banking_platform.customer.repo.CustomerRepo;
import jakarta.transaction.Transactional;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;
@Service
public class CustomerService {

    private final CustomerRepo customerRepo;
    private final UserAuthRepo userAuthRepo;

    public CustomerService(CustomerRepo customerRepo, UserAuthRepo userAuthRepo) {
        this.customerRepo = customerRepo;
        this.userAuthRepo = userAuthRepo;
    }

    // 1️⃣ Create new customer with UserAuth
    @Transactional
    public UserAuth createCustomerWithAuth(CreateCustomerAccountRequest request) {
        Customer customer = new Customer();
        customer.setId(UUID.randomUUID());
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        customer.setAddress(request.getAddress());
        customer.setKycStatus(Customer.Status.PENDING);
        customer.setCreatedAt(LocalDateTime.now());

        UserAuth userAuth = new UserAuth();
        userAuth.setUsername(request.getUsername());
        userAuth.setPassword(request.getPassword()); // hash in real apps!
        userAuth.setRole(Role.CUSTOMER);
        userAuth.setCustomer(customer);

        return userAuthRepo.save(userAuth);
    }

    // 2️⃣ Retrieve by ID (cacheable)
    @Cacheable(value = "customersById", key = "#customerId")
    public Customer getCustomerById(UUID customerId) {
        return customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    // 3️⃣ Retrieve by Email (cacheable)
    @Cacheable(value = "customersByEmail", key = "#email")
    public Customer getCustomerByEmail(String email) {
        return customerRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    // 4️⃣ Update KYC status (refresh cache instead of evict all)
    @Transactional
    @CachePut(value = "customersById", key = "#customerId")
    public Customer updateKycStatus(UUID customerId, Customer.Status status) {
        Customer customer = getCustomerById(customerId);
        customer.setKycStatus(status);
        return customerRepo.save(customer);
    }

    // 5️⃣ Update customer info (refresh cache)
    @Transactional
    @CachePut(value = "customersById", key = "#customerId")
    public Customer updateCustomerInfo(UUID customerId, String name, String email, Short phone, String address) {
        Customer customer = getCustomerById(customerId);
        if (name != null) customer.setName(name);
        if (email != null) customer.setEmail(email);
        if (phone != null) customer.setPhone(phone);
        if (address != null) customer.setAddress(address);
        return customerRepo.save(customer);
    }
    
    // 6️⃣ Delete customer (evict from cache)
    @Transactional
    @CacheEvict(value = "customersById", key = "#customerId")
    public void deleteCustomer(UUID customerId) {
        Customer customer = getCustomerById(customerId);
        customerRepo.delete(customer);
    }
}
