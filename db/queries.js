const pool = require("./pool");

// User queries

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

const getUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id}`);
  return rows;
};

// Message queries

const createMessage = async (title, text, author) => {
  const { rows } = await pool.query(
    "INSERT INTO messages (title, text, author) VALUES ($1, $2, $3)",
    [title, text, author]
  );
  return rows[0];
};

/*
const deleteMessage = async (id) => {
  await pool.query("DELETE * FROM messages WHERE id = $1", [id]);
};
*/

module.exports = { createUser, getUserByUsername, getUserById, createMessage };
