package com.projecct.bankx_digital_banking_platform.common.dto.repo;

import com.projecct.bankx_digital_banking_platform.transaction.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionDto {

    private Transaction.Status status;
    private String referenceId;
}
