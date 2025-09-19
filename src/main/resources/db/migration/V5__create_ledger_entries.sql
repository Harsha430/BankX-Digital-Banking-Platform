CREATE TABLE ledger_entries (
                                id SERIAL PRIMARY KEY,
                                from_account_id INT,
                                to_account_id INT,
                                description VARCHAR(255),
                                txn_type VARCHAR(20),
                                transaction_ref_id VARCHAR(255),
                                amount NUMERIC(19,2),
                                to_account_balance_after NUMERIC(19,2),
                                from_balance_after NUMERIC(19,2),
                                created_at TIMESTAMP,
                                CONSTRAINT fk_ledger_from FOREIGN KEY (from_account_id) REFERENCES accounts(id),
                                CONSTRAINT fk_ledger_to FOREIGN KEY (to_account_id) REFERENCES accounts(id)
);
