# XSS Lab

This repository contains **study material and a local lab setup** to understand **Cross-Site Scripting (XSS)** behavior in modern browsers.

The purpose is **learning and experimentation only**, not production use.

---

## Scope of Study

* Stored XSS
* Reflected XSS
* Browser security behavior
* Why classic payloads fail
* Which payloads still execute

---

## Environment Requirements

* Docker & Docker Compose
* Node.js (v18+ recommended)
* MySQL client (optional)
* Visual Studio Code + Live Server extension
* Modern web browser (Chrome / Firefox)

---

## Project Setup

### 1. Database Setup (MySQL in Docker)

Navigate to the `db` directory and start MySQL:

```bash
docker compose up
```

This launches a MySQL container with persistent storage.

#### Create Database and Table

Connect to MySQL:

```bash
docker exec -it xss-mysql mysql -u root -p
```

Run the following:

```sql
CREATE DATABASE xss_lab;
USE xss_lab;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name TEXT,
  price DECIMAL(10,2)
);
```

This table stores user-controlled input for XSS testing.

---

### 2. Backend Setup (Node.js)

Navigate to the backend folder:

```bash
cd backend
```

Initialize and install dependencies:

```bash
npm init -y
npm install express mysql2 body-parser cors
```

Start the server:

```bash
node server.js
```

Backend responsibilities:

* Connect to MySQL
* Accept unvalidated user input
* Return data without sanitization (intentional)

---

### 3. Frontend Setup (Live Server)

* Open the `frontend` directory in **VS Code**
* Right-click any HTML file
* Select **“Open with Live Server”**

Each page demonstrates a specific XSS type.

---

## Stored XSS Notes

### File

```
stored.html
```

Flow:

1. User input → backend
2. Data stored in MySQL
3. Data rendered using `innerHTML`

### Payload that does NOT execute

```html
<script>alert("hacked")</script>
```

**Reason:**
Modern browsers block `<script>` tags inserted dynamically via `innerHTML`.

---

### Working Stored XSS Payload

```html
<img src=x onerror=alert('XSS')>
```

**Reason:**
Event handlers are executed during DOM rendering.

---

## Reflected XSS Notes

### File

```
reflected.html
```

Flow:

1. User input sent via URL
2. Input reflected immediately in response

### Working Reflected XSS Payload

```html
<iframe src="javascript:alert('XSS')"></iframe>
```

**Reason:**

* `<iframe>` creates a new execution context
* `javascript:` URLs execute automatically

---

## Key Learning Points

### Why `<script>` payloads fail

* Script tags injected via `innerHTML` are not executed
* This is a browser-level security feature

### Why attackers use events and iframes

* Event handlers and `javascript:` URLs still execute
* XSS depends on **execution context**, not HTML tags

----
