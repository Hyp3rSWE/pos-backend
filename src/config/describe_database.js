const sqlite3 = require('sqlite3').verbose();

// Path to your SQLite database file
const dbPath = './database.sqlite';

// Open the SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to SQLite database.');
});

// Function to describe the database
const describeDatabase = () => {
    // Query to list all tables in the database
    const listTablesQuery = `
        SELECT name 
        FROM sqlite_master 
        WHERE type = 'table' 
        AND name NOT LIKE 'sqlite_%';`;

    db.all(listTablesQuery, [], (err, tables) => {
        if (err) {
            console.error('Error retrieving tables:', err.message);
            return;
        }

        if (tables.length === 0) {
            console.log('No tables found in the database.');
            return;
        }

        console.log('Tables found in the database:');
        tables.forEach((table) => {
            console.log(`- ${table.name}`);

            // Query to get the schema of each table
            const describeTableQuery = `PRAGMA table_info(${table.name});`;
            db.all(describeTableQuery, [], (err, columns) => {
                if (err) {
                    console.error(`Error retrieving schema for table ${table.name}:`, err.message);
                    return;
                }

                console.log(`  Columns in ${table.name}:`);
                columns.forEach((column) => {
                    console.log(
                        `    - ${column.name} (${column.type}) ${column.pk ? 'PRIMARY KEY' : ''}`
                    );
                });
            });
        });
    });
};

// Call the function to describe the database
describeDatabase();

// Close the database when done
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
