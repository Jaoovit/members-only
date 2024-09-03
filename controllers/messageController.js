const db = require("../db/queries");

const postNewMessage = async (req, res, next) => {
  try {
    const { title, message } = req.body;

    const firstName = req.user.firstname;
    const lastName = req.user.lastname;

    const author = `${firstName} ${lastName}`;
    console.log(author);
    await db.createMessage(title, message, author);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

module.exports = { postNewMessage };
