INSERT INTO products (name, description, category, price, stock_quantity)
VALUES
('Sample Product 1', 'desc', 'category', 1250.00, 10),
('Sample Product 2', 'desc', 'category', 150.00, 10);

INSERT INTO orders (user_id, total_amount, status) VALUES (2, 2650.00, 'Pending');
INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (1,1,2,1250.00),(1,2,1,150.00);
