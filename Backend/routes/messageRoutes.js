const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const protectRoute = require("../middleware/protectRoute");

const router = express.Router();

router.use(protectRoute);

router.post("/send/:id",sendMessage);

router.get("/:id",getMessages);

module.exports = router;