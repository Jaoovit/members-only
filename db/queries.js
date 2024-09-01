const pool = require("./pool");

const createUser = async (firstName, lastName, username, password, email) => {
  const { rows } = await pool.query(
    "INSERT INTO users (firstName, lastName, username, password, email, member, admin) VALUES ($1, $2, $3, $4, $5, false, false)",
    [firstName, lastName, username, password, email]
  );
  return rows[0];
};

const getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
};

const getUSerById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  return rows;
};

module.exports = { createUser, getUserByUsername, getUSerById };
