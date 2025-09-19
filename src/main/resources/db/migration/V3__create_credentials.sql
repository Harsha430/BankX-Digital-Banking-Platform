CREATE TABLE credentials (
                             id SERIAL PRIMARY KEY,
                             username VARCHAR(255) UNIQUE NOT NULL,
                             password VARCHAR(255) NOT NULL,
                             role VARCHAR(20) NOT NULL,
                             customer_id UUID UNIQUE,
                             CONSTRAINT fk_credentials_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
);
