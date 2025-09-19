CREATE TABLE transactions (
                              id SERIAL PRIMARY KEY,
                              from_account_id INT,
                              to_account_id INT,
                              amount NUMERIC(19,2) NOT NULL,
                              type VARCHAR(20),
                              status VARCHAR(20),
                              reference_id VARCHAR(255) UNIQUE NOT NULL,
                              created_at TIMESTAMP,
                              CONSTRAINT fk_txn_from FOREIGN KEY (from_account_id) REFERENCES accounts(id),
                              CONSTRAINT fk_txn_to FOREIGN KEY (to_account_id) REFERENCES accounts(id)
);
