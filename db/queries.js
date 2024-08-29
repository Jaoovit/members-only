const pool = require("./pool");

const createUser = async (firstName, lastName, username, password, email) => {
  const { rows } = await pool.query(
    `INSERT INTO users (firstName, lastName, username, password, email, member, admin) 
     VALUES ('${firstName}','${lastName}','${username}','${password}','${email}', false, false )`
  );
  return rows;
};

module.exports = { createUser };
