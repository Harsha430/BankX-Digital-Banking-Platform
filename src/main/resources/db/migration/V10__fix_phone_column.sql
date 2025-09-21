-- Fix phone column data type from SMALLINT to VARCHAR
ALTER TABLE customers ALTER COLUMN phone TYPE VARCHAR(20);