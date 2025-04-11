const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,       // e.g., 'mysql-service'
  user: process.env.DB_USER,       // e.g., 'root'
  password: process.env.DB_PASSWORD, // e.g., 'password'
  database: process.env.DB_NAME    // e.g., 'mydatabase'
});

// Handle GET request
app.get('/', (req, res) => {
  db.query('SELECT "Welcome to Kubernetes Deployment!" AS message', (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).send('Database connection error: ' + err);
    } else {
      res.send(result[0].message);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

