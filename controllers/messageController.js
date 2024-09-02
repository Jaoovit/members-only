const db = require("../db/queries");

const postNewMessage = async (req, res, next) => {
  try {
    const { title, message } = req.body;

    const firstName = req.user[0].firstname;
    const lastName = req.user[0].lastname;

    const author = `${firstName} ${lastName}`;

    await db.createMessage(title, message, author);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

module.exports = { postNewMessage };
