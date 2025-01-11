const sqlite3 = require('sqlite3').verbose(); // Import sqlite3

// Open the SQLite database (will create the file if it doesn't exist)
const db = new sqlite3.Database('database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
    // Enable foreign key constraints
    db.run('PRAGMA foreign_keys = ON', (err) => {
      if (err) {
        console.error('Error enabling foreign keys:', err.message);
      } else {
        console.log('Foreign key constraints enabled');
      }
    });
  }
});

// Create tables using raw SQL
const createTableSQLs = [
  `CREATE TABLE IF NOT EXISTS Statistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      value REAL
  );`,
  `CREATE TABLE IF NOT EXISTS summary (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      amount REAL
  );`,
  `CREATE TABLE IF NOT EXISTS customer (
      customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT,
      customer_phone TEXT,
      customer_debt REAL
  );`,
  `CREATE TABLE IF NOT EXISTS supplier (
      supplier_id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_name TEXT,
      supplier_phone TEXT,
      supplier_debt REAL
  );`,
  `CREATE TABLE IF NOT EXISTS product (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER,
      product_barcode TEXT,
      product_price REAL,
      product_name TEXT,
      product_stock_level INTEGER,
      product_cost REAL,
      FOREIGN KEY (supplier_id) REFERENCES supplier (supplier_id)
  );`,
  `CREATE TABLE IF NOT EXISTS product_variant (
      variant_id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER,
      variant_barcode TEXT,
      variant_price REAL,
      variant_quantity INTEGER,
      variant_stock_level INTEGER,
      variant_cost REAL,
      FOREIGN KEY (product_id) REFERENCES product (product_id)
  );`,
  `CREATE TABLE IF NOT EXISTS user (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_role TEXT,
      user_name TEXT,
      user_pass TEXT
  );`,
  `CREATE TABLE IF NOT EXISTS invoice_line_cus (
      product_id INTEGER,
      invoice_cus_id INTEGER,
      product_variant_id INTEGER,
      invoice_cus_line_quantity INTEGER,
      invoice_cus_line_price REAL,
      FOREIGN KEY (product_id) REFERENCES product (product_id),
      FOREIGN KEY (invoice_cus_id) REFERENCES invoice_cus (invoice_cus_id)
  );`,
  `CREATE TABLE IF NOT EXISTS invoice_cus (
      invoice_cus_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER,
      invoice_cus_timestamp TIMESTAMP,
      invoice_cus_total_amount REAL,
      FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
  );`,
  `CREATE TABLE IF NOT EXISTS debt_cus (
      customer_id INTEGER,
      debt_cus_timestamp TIMESTAMP,
      debt_cus_amount REAL,
      FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
  );`,
  `CREATE TABLE IF NOT EXISTS debt_sup (
      supplier_id INTEGER,
      debt_sup_timestamp TIMESTAMP,
      debt_sup_amount REAL,
      FOREIGN KEY (supplier_id) REFERENCES supplier (supplier_id)
  );`,
  `CREATE TABLE IF NOT EXISTS invoice_sup (
      invoice_sup_id INTEGER PRIMARY KEY AUTOINCREMENT,
      supplier_id INTEGER,
      invoice_sup_timestamp TIMESTAMP,
      invoice_sup_total_amount REAL,
      FOREIGN KEY (supplier_id) REFERENCES supplier (supplier_id)
  );`,
  `CREATE TABLE IF NOT EXISTS invoice_line_sup (
      product_id INTEGER,
      invoice_sup_id INTEGER,
      product_variant_id INTEGER,
      invoice_sup_line_quantity INTEGER,
      invoice_sup_line_price REAL,
      FOREIGN KEY (product_id) REFERENCES product (product_id),
      FOREIGN KEY (invoice_sup_id) REFERENCES invoice_sup (invoice_sup_id),
      FOREIGN KEY (product_variant_id) REFERENCES product_variant (variant_id)
  );`,
  `CREATE TABLE IF NOT EXISTS adjustment (
      adjustment_id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      product_id INTEGER,
      product_variant_id INTEGER,
      adjustment_timestamp TIMESTAMP,
      previous_quantity INTEGER,
      new_quantity INTEGER,
      adjustment_reason TEXT,
      FOREIGN KEY (product_id) REFERENCES product (product_id),
      FOREIGN KEY (user_id) REFERENCES user (user_id)
  );`
];

// Function to execute SQL statements sequentially
const createTables = (sqlStatements, dbInstance) => {
  sqlStatements.forEach((sql) => {
    dbInstance.run(sql, (err) => {
      if (err) {
        console.error('Error executing SQL:', err.message, sql);
      } else {
        console.log('Table created or already exists.');
      }
    });
  });
};

// Execute table creation
createTables(createTableSQLs, db);

// Close the database when done
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed');
  }
});
