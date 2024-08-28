require("dotenv").config();

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;
const SQLPORT = process.env.SQLPORT;

const { Pool } = require("pg");

const pool = new Pool({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DB,
  port: SQLPORT,
});

module.exports = pool;
