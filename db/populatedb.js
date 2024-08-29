#!/usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const HOST = process.env.HOST;
const USER = process.env.USER;
const DB = process.env.DB;
const PASSWORD = process.env.PASSWORD;
const SQLPORT = process.env.SQLPORT;

const SQL = `
 CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(250) NOT NULL,
  lastName VARCHAR(250) NOT NULL,
  email VARCHAR(250) UNIQUE NOT NULL,
  username VARCHAR(250) UNIQUE NOT NULL,
  password VARCHAR(250) NOT NULL,
  member BOOLEAN,
  admin BOOLEAN);
  
CREATE TABLE IF NOT EXISTS messages(
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  text VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
`;

async function main() {
  console.log("seending the database...");
  const client = new Client({
    connectionString: `postgresql://${USER}:${PASSWORD}@${HOST}:${SQLPORT}/${DB}`,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log("Table created and data inserted sucessfully");
  } catch (err) {
    console.error("Error executing query", err);
  } finally {
    await client.end();
  }
}

main();
