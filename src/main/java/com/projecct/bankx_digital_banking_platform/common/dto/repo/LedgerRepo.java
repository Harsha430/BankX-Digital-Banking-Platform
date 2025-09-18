package com.projecct.bankx_digital_banking_platform.common.dto.repo;

import com.projecct.bankx_digital_banking_platform.common.dto.LedgerEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LedgerRepo extends JpaRepository<LedgerEntry, Integer> {
}
