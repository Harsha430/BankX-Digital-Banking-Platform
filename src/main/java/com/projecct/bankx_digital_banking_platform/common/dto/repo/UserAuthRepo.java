package com.projecct.bankx_digital_banking_platform.common.dto.repo;

import com.projecct.bankx_digital_banking_platform.common.dto.UserAuth;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepo extends JpaRepository<UserAuth, Integer> {
    Optional<UserAuth> findByUsername(String username);
}
