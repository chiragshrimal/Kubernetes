const express = require("express");
const { Client } = require("pg");

const app = express();

const client = new Client({
  host: process.env.DB_HOST,
  user: "postgres",
  password: "postgres",
  database: "postgres",
  port: 5432,
});

async function connectDB() {
  while (true) {
    try {
      await client.connect();
      console.log("Connected to Postgres");
      break;
    } catch (err) {
      console.log("Retrying DB connection...");
      await new Promise(res => setTimeout(res, 2000));
    }
  }
}

connectDB();

app.get("/", async (req, res) => {
  const result = await client.query("SELECT NOW()");
  res.send(result.rows[0]);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});