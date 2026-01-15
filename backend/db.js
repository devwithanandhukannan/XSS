const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",   // Docker mapped port
  user: "xss_user",
  password: "xss_pass",
  database: "xss_lab",
});

db.connect((err) => {
  if (err) {
    console.error("DB Connection Failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = db;
