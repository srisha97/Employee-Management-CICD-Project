CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS employee (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    department VARCHAR(100) NOT NULL
);

INSERT INTO employee (name, email, department) VALUES
('Arun Kumar', 'arun@example.com', 'IT'),
('Priya Sharma', 'priya@example.com', 'HR');
