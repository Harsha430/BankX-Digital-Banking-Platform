CREATE TABLE accounts (
                          id SERIAL PRIMARY KEY,
                          account_number VARCHAR(12) UNIQUE NOT NULL,
                          account_type VARCHAR(20),
                          balance NUMERIC(19,2),
                          customer_id UUID,
                          CONSTRAINT fk_account_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
);
