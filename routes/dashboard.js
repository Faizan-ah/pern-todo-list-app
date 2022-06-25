const express = require("express");

const router = express.Router();
const auth = require("../middleware/auth");

/*
desc: Logging in to dashboard
*/

router.get("/", auth, (req, res) => {
   res.json({ msg: `logged in as ${req.id}` });
});

module.exports = router;
