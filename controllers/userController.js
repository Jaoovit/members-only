const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const getSignUpForm = (req, res) => {
  res.render("signUp");
};

const getSignInForm = (req, res) => {
  res.render("signIn");
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
  } catch (error) {
    next(error);
  }
  res.redirect("/sign-in");
};

const userAuthenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).render("signIn", { error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("Session:", req.session);
      console.log("User:", req.user);
      return res.redirect("/homepage");
    });
  })(req, res, next);
};

module.exports = {
  getSignUpForm,
  getSignInForm,
  postNewUser,
  userAuthenticate,
};
