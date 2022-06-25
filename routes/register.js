const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();
const { client } = require("../config/db");

/*
desc: Posting to register path
      and also getting it
*/
router.get("/", (req, res) => {
   res.send({ msg: "there is nothing to see here" });
});

router.post("/", async (req, res) => {
   const { email, password } = req.body; // extracting email and password from req.body
   const salt = await bcrypt.genSalt(14);
   const encryptedPassword = await bcrypt.hash(password, salt);
   // const user = new UserModel({ email, password: encryptedPassword });

   try {
      const getUserEmail = await client.query(
         "SELECT * FROM public.user where email = $1",
         [email]
      );
      if (getUserEmail.rows.length > 0)
         return res.status(401).json({ msg: "User already exists" });
      const saveUser = await client.query(
         "INSERT INTO public.user (email,password) VALUES($1,$2) RETURNING *",
         [email, encryptedPassword]
      );
      const token = jwt.sign(
         {
            id: saveUser.id,
         },
         config.get("secretKey"),
         { expiresIn: 60 * 60 }
      );
      res.json({ msg: "registration successful", token });
   } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "server error" });
   }
});

module.exports = router;
