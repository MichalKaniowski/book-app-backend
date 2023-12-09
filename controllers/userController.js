const { User } = require("../models/User");

async function createUser(req, res) {
  try {
    const { email, username, firebaseId } = req.body;

    const userInDatabase = await User.findOne({ email });

    if (userInDatabase) {
      return res.json(userInDatabase);
    }

    const user = await User.create({ email, username, firebaseId });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
}

module.exports = { createUser };
