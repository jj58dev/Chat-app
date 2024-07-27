const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const getUsers = require("../controllers/userController");

const router = express.Router();

router.use(protectRoute);

router.get("/",getUsers);

module.exports = router;