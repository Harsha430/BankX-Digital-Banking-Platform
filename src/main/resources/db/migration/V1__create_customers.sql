CREATE TABLE customers (
                           id UUID PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           email VARCHAR(255) UNIQUE NOT NULL,
                           phone SMALLINT,
                           address VARCHAR(255),
                           kyc_status VARCHAR(20),
                           created_at TIMESTAMP
);
