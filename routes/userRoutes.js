const express = require("express");
const router = express.Router();
const { getUser, createUser, addSpentTime } = require("../controllers/userController");

router.get("/getUser/:firebaseId", getUser);

router.post("/createUser", createUser);

router.post("/addSpentTime", addSpentTime);

module.exports = router;
