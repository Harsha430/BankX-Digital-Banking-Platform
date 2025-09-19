CREATE TABLE audit_logs (
                            id SERIAL PRIMARY KEY,
                            entity_name VARCHAR(255),
                            entity_id VARCHAR(255),
                            action VARCHAR(20),
                            changed_by VARCHAR(255),
                            old_value TEXT,
                            new_value TEXT,
                            timestamp TIMESTAMP
);
