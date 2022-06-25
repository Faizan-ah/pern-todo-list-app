const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();

const { client } = require("../config/db");
/*
desc: Posting to login path
      and also getting it
*/
router.get("/", (req, res) => {
   res.send({ msg: "there is nothing to see here" });
});

router.post("/", async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await client.query(
         "SELECT * FROM public.user where email = $1",
         [email]
      );
      if (user.rows.length === 0)
         return res.status(401).json({ msg: "User not found" });
      const userPassword = user.rows[0].password;
      const isPasswordValid = await bcrypt.compare(password, userPassword);
      if (isPasswordValid) {
         const token = jwt.sign(
            {
               id: user.rows[0].id,
            },
            config.get("secretKey"),
            { expiresIn: 60 * 60 }
         );
         res.json({ msg: "login successful", token });
      } else {
         return res.status(400).json({ msg: "Invalid Credentials" });
      }
   } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
   }
});

module.exports = router;
