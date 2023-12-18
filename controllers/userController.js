const { User } = require("../models/User");

async function getUser(req, res) {
  try {
    const firebaseId = req.params.firebaseId;
    const user = await User.findOne({ firebaseId });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
}

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

async function addSpentTime(req, res) {
  try {
    const {userFirebaseId, spentTimeInSeconds} = req.body;
  
    const user = await User.findOne({firebaseId: userFirebaseId}); 
    
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { spentTime: user.spentTime + spentTimeInSeconds },
      { returnDocument: "after" }
    );

    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({message: "Something went wrong"})
  }
}

module.exports = { getUser, createUser, addSpentTime };
