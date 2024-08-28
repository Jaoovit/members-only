#!/usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const HOST = process.env.HOST;
const USER = process.env.USER;
const DB = process.env.DB;
const PASSWORD = process.env.PASSWORD;
const SQLPORT = process.env.SQLPORT;

const SQL = `
 CREATE TABLE IF NOT EXIST users(
  id SERIAL PRIMARY KEY,
  firstName VARCHAR(50) NOT NULL,
  lastName VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(50) NOT NULL,
  member BOOLEAN,
  admin BOOLEAN)
  
CREATE TABLE IF NOT EXIST messages(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  text VARCHAR(250) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

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
