-- Insert sample customers
INSERT INTO customers (id, name, email, phone, address, kyc_status, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'John Doe', 'admin@bankx.com', 5551234567, '123 Main Street, New York, NY 10001', 'VERIFIED', '2023-01-15 10:00:00'),
('550e8400-e29b-41d4-a716-446655440001', 'Jane Smith', 'jane.smith@email.com', 5559876543, '456 Oak Avenue, Los Angeles, CA 90210', 'VERIFIED', '2023-02-20 14:30:00'),
('550e8400-e29b-41d4-a716-446655440002', 'Mike Johnson', 'mike.johnson@email.com', 5555551234, '789 Pine Street, Chicago, IL 60601', 'PENDING', '2023-03-10 09:15:00');

-- Insert credentials for customers
INSERT INTO credentials (username, password, role, customer_id) VALUES
('admin@bankx.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER', '550e8400-e29b-41d4-a716-446655440000'), -- password: secret
('jane.smith@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER', '550e8400-e29b-41d4-a716-446655440001'),
('mike.johnson@email.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER', '550e8400-e29b-41d4-a716-446655440002');

-- Insert accounts for John Doe (admin user)
INSERT INTO accounts (account_number, account_type, balance, customer_id) VALUES
('123456789012', 'SAVINGS', 85430.50, '550e8400-e29b-41d4-a716-446655440000'),
('567890123456', 'CURRENT', 12750.25, '550e8400-e29b-41d4-a716-446655440000'),
('901234567890', 'WALLET', 2249.75, '550e8400-e29b-41d4-a716-446655440000'),
('345678901234', 'SAVINGS', 45680.90, '550e8400-e29b-41d4-a716-446655440000');

-- Insert accounts for Jane Smith
INSERT INTO accounts (account_number, account_type, balance, customer_id) VALUES
('111222333444', 'SAVINGS', 25000.00, '550e8400-e29b-41d4-a716-446655440001'),
('555666777888', 'CURRENT', 8500.75, '550e8400-e29b-41d4-a716-446655440001');

-- Insert accounts for Mike Johnson
INSERT INTO accounts (account_number, account_type, balance, customer_id) VALUES
('999888777666', 'SAVINGS', 15000.00, '550e8400-e29b-41d4-a716-446655440002'),
('444333222111', 'WALLET', 750.25, '550e8400-e29b-41d4-a716-446655440002');

-- Insert sample transactions
INSERT INTO transactions (from_account_id, to_account_id, amount, type, status, reference_id, created_at) VALUES
-- Credits (deposits)
(NULL, 1, 2500.00, 'CREDIT', 'SUCCESS', 'TXN-20250919-1234', '2025-09-19 10:30:00'),
(NULL, 2, 3200.00, 'CREDIT', 'SUCCESS', 'TXN-20250912-4567', '2025-09-12 11:15:00'),
(NULL, 3, 125.00, 'CREDIT', 'SUCCESS', 'TXN-20250914-2345', '2025-09-14 16:20:00'),

-- Debits (withdrawals/payments)
(2, NULL, 150.75, 'DEBIT', 'SUCCESS', 'TXN-20250918-5678', '2025-09-18 15:45:00'),
(2, NULL, 89.99, 'DEBIT', 'SUCCESS', 'TXN-20250916-3456', '2025-09-16 12:00:00'),
(2, NULL, 45.50, 'DEBIT', 'PENDING', 'TXN-20250915-7890', '2025-09-15 08:30:00'),
(2, NULL, 299.99, 'DEBIT', 'FAILED', 'TXN-20250913-6789', '2025-09-13 14:10:00'),
(2, NULL, 1200.00, 'DEBIT', 'SUCCESS', 'TXN-20250911-8901', '2025-09-11 09:00:00'),

-- Transfers
(1, 4, 1000.00, 'TRANSFER', 'SUCCESS', 'TXN-20250917-9012', '2025-09-17 09:15:00'),
(1, 3, 500.00, 'TRANSFER', 'SUCCESS', 'TXN-20250910-2468', '2025-09-10 14:30:00');

-- Insert audit logs
INSERT INTO audit_logs (entity_name, entity_id, action, changed_by, old_value, new_value, timestamp) VALUES
('customers', '550e8400-e29b-41d4-a716-446655440000', 'INSERT', 'SYSTEM', NULL, '{"name":"John Doe","email":"admin@bankx.com"}', '2023-01-15 10:00:00'),
('accounts', '1', 'INSERT', 'SYSTEM', NULL, '{"account_number":"123456789012","balance":85430.50}', '2023-01-15 10:05:00'),
('transactions', '1', 'INSERT', 'admin@bankx.com', NULL, '{"amount":2500.00,"type":"CREDIT","status":"SUCCESS"}', '2025-09-19 10:30:00');