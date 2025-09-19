CREATE TABLE outbox_events (
                               id SERIAL PRIMARY KEY,
                               aggregate_type VARCHAR(255),
                               aggregate_id VARCHAR(255),
                               type VARCHAR(255),
                               payload TEXT,
                               status VARCHAR(20),
                               created_at TIMESTAMP,
                               sent_at TIMESTAMP
);
