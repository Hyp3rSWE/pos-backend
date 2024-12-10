INSERT INTO "user" (user_role, user_name, user_pass)
VALUES
('Admin', 'admin', 'password123'),
('Manager', 'admin', 'managerpass'),
('Cashier', 'cashier', 'cashierpass');

INSERT INTO "customer" (customer_name, customer_phone, customer_debt)
VALUES
('John Doe', '123-456-7890', 150.50),
('Jane Smith', '987-654-3210', 200.75),
('Mark Taylor', '555-555-5555', 0.00);

INSERT INTO "supplier" (supplier_name, supplier_phone, supplier_debt)
VALUES
('Acme Supplies', '111-222-3333', 500.00),
('Global Tech', '444-555-6666', 350.25),
('Supply Co.', '777-888-9999', 0.00);

INSERT INTO "product" (supplier_id, product_barcode, product_price, product_name, product_stock_level)
VALUES
(1, 'ABC123', 10.50, 'Widget A', 100),
(2, 'DEF456', 20.75, 'Widget B', 200),
(3, 'GHI789', 15.00, 'Widget C', 150);

INSERT INTO "product_variant" (product_id, variant_barcode, variant_price, variant_quantity, variant_stock_level)
VALUES
(1, 'VAR123', 11.00, 10, 90),
(2, 'VAR456', 22.00, 5, 195),
(3, 'VAR789', 16.00, 20, 130);

INSERT INTO "invoice_cus" (customer_id, invoice_cus_timestamp, invoice_cus_total_amount)
VALUES
(1, '2024-12-01 10:00:00', 50.00),
(2, '2024-12-02 14:30:00', 75.25),
(3, '2024-12-03 09:45:00', 100.00);

INSERT INTO "invoice_line_cus" (product_id, invoice_cus_id, product_variant_id, invoice_cus_line_quantity, invoice_cus_line_price)
VALUES
(1, 1, 1, 2, 22.00),
(2, 2, 2, 3, 66.00),
(3, 3, 3, 4, 64.00);

INSERT INTO "debt_cus" (customer_id, debt_cus_timestamp, debt_cus_amount)
VALUES
(1, '2024-12-04 11:00:00', 150.50),
(2, '2024-12-05 15:00:00', 200.75);

INSERT INTO "debt_sup" (supplier_id, debt_sup_timestamp, debt_sup_amount)
VALUES
(1, '2024-12-04 10:30:00', 500.00),
(2, '2024-12-05 12:00:00', 350.25);

INSERT INTO "invoice_sup" (supplier_id, invoice_sup_timestamp, invoice_sup_total_amount)
VALUES
(1, '2024-12-06 09:00:00', 300.00),
(2, '2024-12-07 16:00:00', 400.75);

INSERT INTO "invoice_line_sup" (product_id, invoice_sup_id, product_variant_id, invoice_sup_line_quantity, invoice_sup_line_price)
VALUES
(1, 1, 1, 5, 55.00),
(2, 2, 2, 10, 220.00);