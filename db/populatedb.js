#!/usr/bin/env node

require("dotenv").config();
const { Client } = require("pg");

const HOST = process.env.HOST;
const USER = process.env.USER;
const DB = process.env.DB;
const PASSWORD = process.env.PASSWORD;
const SQLPORT = process.env.SQLPORT;

const SQL = ``;

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
