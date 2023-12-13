const express = require("express");
const router = express.Router();
const { getUser, createUser } = require("../controllers/userController");

router.get("/getUser", getUser);

router.post("/createUser", createUser);

module.exports = router;
