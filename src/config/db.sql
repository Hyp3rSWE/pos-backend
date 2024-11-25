CREATE TABLE "customer" (
    "customer_id" VARCHAR(255) PRIMARY KEY,
    "customer_name" VARCHAR(255),
    "customer_phone" VARCHAR(50),
    "customer_debt" DOUBLE PRECISION
);

CREATE TABLE "user" (
    "user_id" VARCHAR(255) PRIMARY KEY,
    "user_role" VARCHAR(50),
    "user_pass" VARCHAR(255)
);

CREATE TABLE "supplier" (
    "supplier_id" VARCHAR(255) PRIMARY KEY,
    "supplier_name" VARCHAR(255),
    "supplier_phone" VARCHAR(50)
);

CREATE TABLE "product" (
    "product_id" VARCHAR(255) PRIMARY KEY,
    "supplier_id" VARCHAR(255),
    "product_barcode" VARCHAR(50),
    "product_price" DOUBLE PRECISION,
    "product_name" VARCHAR(255),
    "product_stock_level" INT,
    CONSTRAINT FK_SUPPLIER FOREIGN KEY ("supplier_id") REFERENCES "supplier" ("supplier_id")
);

CREATE TABLE "product_variant" (
    "variant_id" VARCHAR(255) PRIMARY KEY,
    "product_id" VARCHAR(255),
    "variant_barcode" VARCHAR(50),
    "variant_price" DOUBLE PRECISION,
    "variant_quantity" INT,
    "variant_stock_level" INT,
    CONSTRAINT FK_PRODUCT FOREIGN KEY ("product_id") REFERENCES "product" ("product_id")
);

CREATE TABLE "invoice" (
    "invoice_id" VARCHAR(255) PRIMARY KEY,
    "user_id" VARCHAR(255),
    "customer_id" VARCHAR(255),
    "invoice_timestamp" TIMESTAMP,
    "invoice_total_amount" DOUBLE PRECISION,
    "invoice_paid_amount" DOUBLE PRECISION,
    CONSTRAINT FK_USER FOREIGN KEY ("user_id") REFERENCES "user" ("user_id"),
    CONSTRAINT FK_CUSTOMER FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id")
);

CREATE TABLE "invoice_line" (
    "product_id" VARCHAR(255),
    "invoice_id" VARCHAR(255),
    "product_variant_id" VARCHAR(255),
    "invoice_line_quantity" INT,
    "invoice_line_price" DOUBLE PRECISION,
    PRIMARY KEY ("product_id", "invoice_id", "product_variant_id"),
    CONSTRAINT FK_INVOICE FOREIGN KEY ("invoice_id") REFERENCES "invoice" ("invoice_id"),
    CONSTRAINT FK_PRODUCT_LINE FOREIGN KEY ("product_id") REFERENCES "product" ("product_id"),
    CONSTRAINT FK_VARIANT_LINE FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("variant_id")
);