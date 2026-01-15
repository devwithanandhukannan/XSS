USE xss_lab;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(150),
    price DECIMAL(10,2)
);
