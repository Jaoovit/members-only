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

      req.session.userInfo = req.user;

      return res.redirect("/");
    });
  })(req, res, next);
};

const getHomepage = async (req, res) => {
  const userInfo = req.session.userInfo;
  const messages = await db.getAllMessages();

  res.render("homepage", { info: userInfo, messages: messages });
};

const userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      return res.redirect("/sign-in");
    });
  });
};

const updateMemberStatus = async (req, res, next) => {
  try {
    const memberPassword = req.body.memberPassword;
    const userId = req.session.userInfo.id;

    if (memberPassword === "member") {
      await db.setMember(userId);
      req.session.userInfo.isMember = true;
      res.redirect("/");
    } else {
      throw new Error("This member password is invalid");
    }
  } catch (error) {
    return next(error);
  }
};

const updateAdminStatus = async (req, res, next) => {
  try {
    const adminPassword = req.body.adminPassword;
    const userId = req.session.userInfo.id;

    if (adminPassword === "admin") {
      await db.setAdmin(userId);
      req.session.userInfo.isAdmin = true;
      res.redirect("/");
    } else {
      throw new Error("This admin password is invalid");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSignUpForm,
  getSignInForm,
  postNewUser,
  userAuthenticate,
  getHomepage,
  userLogout,
  updateMemberStatus,
  updateAdminStatus,
};
