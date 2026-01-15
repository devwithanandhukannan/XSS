const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* =============================
   STORED XSS API
=============================*/
app.post("/product", (req, res) => { 
  const { product_name, price } = req.body;
  db.query(
    "INSERT INTO products (product_name, price) VALUES (?, ?)",
    [product_name, price],
    err => {
      if (err) return res.status(500).json({ error: "DB Error" });
      res.json({ message: "Product added" });
    }
  );
});

app.get("/search", (req, res) => {
  const q = req.query.q || "";

  db.query(
    "SELECT * FROM products WHERE product_name LIKE ?",
    [`%${q}%`],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "DB Error" });
      }

      // reflect q back with results
      res.json({
        search: q,      // 🔥 reflected user input
        results: results
      });
    }
  );
});



app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
