const express = require("express");
const protectRoute = require("../middleware/protectRoute");


const router = express.Router();

router.use(protectRoute);

router.get("/",);

module.exports = router;