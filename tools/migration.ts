import "dotenv/config";
const { Pool } = require("pg");

// Initialize PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Create posts table
const createTable =
  "CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, uuid TEXT, url TEXT, parent_url TEXT, author TEXT, title TEXT, text TEXT, highlight_text TEXT, highlight_title TEXT, highlight_thread_title TEXT, language TEXT, sentiment TEXT,created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW())";

(async () => {
  try {
    console.log("Running migration...");
    const client = await pool.connect();
    await client.query(createTable);
    console.log("Migration completed successfully!");
    client.release();
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await pool.end();
  }
})();
