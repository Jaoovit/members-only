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
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

const setMember = async (id) => {
  await pool.query("UPDATE users SET member = true WHERE id = $1", [id]);
};

const setAdmin = async (id) => {
  await pool.query("UPDATE users SET admin = true WHERE id = $1", [id]);
};

// Message queries

const createMessage = async (title, text, author) => {
  const { rows } = await pool.query(
    "INSERT INTO messages (title, text, author) VALUES ($1, $2, $3)",
    [title, text, author]
  );
  return rows[0];
};

const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  return rows;
};

const deleteMessage = async (id) => {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  setMember,
  setAdmin,
  createMessage,
  getAllMessages,
  deleteMessage,
};
