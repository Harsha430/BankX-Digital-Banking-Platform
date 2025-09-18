package com.projecct.bankx_digital_banking_platform.common.dto.repo;

import com.projecct.bankx_digital_banking_platform.common.dto.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepo extends JpaRepository<UserAuth, Integer> {
}
