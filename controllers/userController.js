const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const getSignUpForm = (req, res) => {
  res.render("signUp");
};

const postNewUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password, confPassword, email } =
      req.body;

    if (password !== confPassword) {
      throw new Error("Password must match password confirmation");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db.createUser(firstName, lastName, username, hashPassword, email);
    console.log("user created successfully");
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};

module.exports = { getSignUpForm, postNewUser };
