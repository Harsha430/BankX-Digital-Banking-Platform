package com.projecct.bankx_digital_banking_platform.audit;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditRepo extends JpaRepository<Audit, Long> {
}
