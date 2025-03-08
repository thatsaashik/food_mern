import express, { json } from "express";
const router = express.Router();
import userSchema from "../models/userSchema.js";
import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();


  

router.post(
  "/UserRouter",
  body("name")
    .isLength({ min: 5 })
    .withMessage("please name must be atleat 5 character log"),
  body("email").isEmail().withMessage("Invalid email please check"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("please password must be atleast 5 character long"),

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const salt = await bcrypt.genSalt(10)
    let secPassword = await bcrypt.hashSync(req.body.password, salt)

    try {
      await userSchema.create({
        name: req.body.name,
        password: secPassword,
        location: req.body.location,
        email: req.body.email,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/UserLogIn",
  body("email").isEmail().withMessage("Invalid email please check"),
  body("password").isLength({ min: 5 }).withMessage("please Enter Valid Password"),

  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    let email = req.body.email;
    try {
      const userData = await userSchema.findOne({ email });

      if (!userData) {
        return res.status(400).json({ error: "Try Logging with currect data" });
      }

       const ComparePassword = await bcrypt.compareSync(req.body.password,userData.password)
      if (!ComparePassword) {
        return res.status(400).json({ error: "Try Logging with currect data" });
      }
     
       const data = {
        user:{
          id:userData.id
        }
       }
       const JwtSecretKey = process.env.JWT_SECRET;
       const authToken = jwt.sign(data, JwtSecretKey, { expiresIn: '1h' });

      return  res.json({success:true,authToken:authToken})

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

export default router;
