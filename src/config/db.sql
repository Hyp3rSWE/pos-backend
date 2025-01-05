CREATE TABLE "user" (
    "user_id" SERIAL PRIMARY KEY,
    "user_role" VARCHAR(50),
    "user_name" VARCHAR(255),
    "user_pass" VARCHAR(255)
);

CREATE TABLE "customer" (
    "customer_id" SERIAL PRIMARY KEY,
    "customer_name" VARCHAR(255),
    "customer_phone" VARCHAR(50),
    "customer_debt" DOUBLE PRECISION
);

CREATE TABLE "supplier" (
    "supplier_id" SERIAL PRIMARY KEY,
    "supplier_name" VARCHAR(255),
    "supplier_phone" VARCHAR(50),
    "supplier_debt" DOUBLE PRECISION
);

CREATE TABLE "product" (
    "product_id" SERIAL PRIMARY KEY,
    "supplier_id" INT,
    "product_barcode" VARCHAR(50),
    "product_price" DOUBLE PRECISION,
    "product_name" VARCHAR(255),
    "product_stock_level" INT,
    CONSTRAINT FK_SUPPLIER FOREIGN KEY ("supplier_id") REFERENCES "supplier" ("supplier_id")
);

CREATE TABLE "product_variant" (
    "variant_id" SERIAL PRIMARY KEY,
    "product_id" INT,
    "variant_barcode" VARCHAR(50),
    "variant_price" DOUBLE PRECISION,
    "variant_quantity" INT,
    "variant_stock_level" INT,
    CONSTRAINT FK_PRODUCT FOREIGN KEY ("product_id") REFERENCES "product" ("product_id")
);

CREATE TABLE "invoice_cus" (
    "invoice_cus_id" SERIAL PRIMARY KEY,
    "customer_id" INT,
    "invoice_cus_timestamp" TIMESTAMP,
    "invoice_cus_total_amount" DOUBLE PRECISION,
    CONSTRAINT FK_CUSTOMER FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id")
);

CREATE TABLE "invoice_line_cus" (
    "product_id" INT,
    "invoice_cus_id" INT,
    "product_variant_id" INT,
    "invoice_cus_line_quantity" INT,
    "invoice_cus_line_price" DOUBLE PRECISION,
    PRIMARY KEY ("product_id", "invoice_cus_id"),
    CONSTRAINT FK_INVOICE_CUS FOREIGN KEY ("invoice_cus_id") REFERENCES "invoice_cus" ("invoice_cus_id"),
    CONSTRAINT FK_PRODUCT_LINE FOREIGN KEY ("product_id") REFERENCES "product" ("product_id"),
    CONSTRAINT FK_VARIANT_LINE FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("variant_id")
);

CREATE TABLE "debt_cus" (
    "customer_id" INT,
    "debt_cus_timestamp" TIMESTAMP,
    "debt_cus_amount" DOUBLE PRECISION,
    PRIMARY KEY ("customer_id", "debt_cus_timestamp"),
    CONSTRAINT FK_CUSTOMER FOREIGN KEY ("customer_id") REFERENCES "customer" ("customer_id")
);

CREATE TABLE "debt_sup" (
    "supplier_id" INT,
    "debt_sup_timestamp" TIMESTAMP,
    "debt_sup_amount" DOUBLE PRECISION,
    PRIMARY KEY ("supplier_id", "debt_sup_timestamp"),
    CONSTRAINT FK_SUPPLIER FOREIGN KEY ("supplier_id") REFERENCES "supplier" ("supplier_id")
);

CREATE TABLE "invoice_sup" (
    "invoice_sup_id" SERIAL PRIMARY KEY,
    "supplier_id" INT,
    "invoice_sup_timestamp" TIMESTAMP,
    "invoice_sup_total_amount" DOUBLE PRECISION,
    CONSTRAINT FK_SUPPLIER FOREIGN KEY ("supplier_id") REFERENCES "supplier" ("supplier_id")
);

CREATE TABLE "invoice_line_sup" (
    "product_id" INT,
    "invoice_sup_id" INT,
    "product_variant_id" INT,
    "invoice_sup_line_quantity" INT,
    "invoice_sup_line_price" DOUBLE PRECISION,
    PRIMARY KEY ("product_id", "invoice_sup_id"),
    CONSTRAINT FK_INVOICE_SUP FOREIGN KEY ("invoice_sup_id") REFERENCES "invoice_sup" ("invoice_sup_id"),
    CONSTRAINT FK_PRODUCT_LINE FOREIGN KEY ("product_id") REFERENCES "product" ("product_id"),
    CONSTRAINT FK_VARIANT_LINE FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("variant_id")
);

CREATE TABLE "adjustment" (
    "adjustment_id" SERIAL PRIMARY KEY,
    "user_id" INT,
    "product_id" INT,
    "product_variant_id" INT,
    "adjustment_timestamp" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "previous_quantity" INT,
    "new_quantity" INT,
    "adjustment_reason" VARCHAR(255),
    CONSTRAINT FK_USER FOREIGN KEY ("user_id") REFERENCES "user" ("user_id"),
    CONSTRAINT FK_PRODUCT FOREIGN KEY ("product_id") REFERENCES "product" ("product_id"),
    CONSTRAINT FK_VARIANT FOREIGN KEY ("product_variant_id") REFERENCES "product_variant" ("variant_id")
);

CREATE TABLE "Statistics" (
    ID SERIAL PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL UNIQUE,
    VALUE FLOAT NOT NULL DEFAULT 0
);

INSERT INTO "Statistics" (
    NAME,
    VALUE
) VALUES (
    'total_stock',
    0
),
(
    'total_debt_sup',
    0
),
(
    'total_debt_cus',
    0
);