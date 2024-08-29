const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("../db/pool");

const sessionStorage = new pgSession({
  pool: pool,
  tableName: "session",
  createTableIfMissing: true,
});

const SECRET = process.env.SECRET;

const sessionConfig = session({
  store: sessionStorage,
  secret: SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
});

module.exports = sessionConfig;
