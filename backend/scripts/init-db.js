const fs = require('fs');
const path = require('path');
const { pool } = require('../db');

const schemaPath = path.join(__dirname, '..', 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

async function init() {
  try {
    await pool.query(schema);
    console.log('Database schema initialized.');
  } catch (err) {
    console.error('Init failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

init();
