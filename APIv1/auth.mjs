import express from "express";
import { client } from "../mongodb.mjs";
import Jwt from "jsonwebtoken";
import { stringToHash, varifyHash } from "bcrypt-inzi";
const router = express.Router();
const db = client.db("crudDB");
const dbCollection = db.collection("users");

router.post("/login", async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(403).send({ message: "Required Paramater Missing" });
    return;
  }

  const emailInLower = req.body.email.toString();
  emailInLower.toLowerCase();

  try {
    const result = await dbCollection.findOne({ email: emailInLower });
    if (!result) {
      res.status(401).send({ message: "Email or Password incorrect" });
      return;
    } else {
      const isCompare = await varifyHash(req.body.password, result.password);
      if (isCompare) {
        // Genarate a Token
        const token = Jwt.sign(
          {
            isAdmin: false,
            firstName: result.firstName,
            lastName: result.lastName,
            email: req.body.email,
          },
          process.env.SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          // maxAge: 60000,
        });
        res.send({
          message: "Login Successfully",
        });
        return;
      } else {
        res.status(401).send({ message: "Email or Password incorrect" });
      }
    }
  } catch (error) {
    console.log("error getting data mongodb: ", error);
    res.status(500).send({ message: "server error, please try later" });
  }
});
router.post("/signup", async (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.password
  ) {
    res.status(403).send({ message: "Required Paramater Missing" });
    return;
  }
  const emailInLower = req.body.email.toLowerCase();
  try {
    const result = await dbCollection.findOne({
      email: emailInLower,
    });
    console.log(result);
    if (!result) {
      const passwordHash = await stringToHash(req.body.password);
      const addUser = await dbCollection.insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordHash,
        createdOn: new Date(),
      });
      res.send({ message: "Signup Successfully" });
    } else {
      res.status(403).send({
        message: "User already exist with this email",
      });
      console.log("error done creating");
    }
  } catch (error) {
    console.log("error getting data mongodb: ", error);
    res.status(500).send("Server Error, Please try later");
  }
});

export default router;
