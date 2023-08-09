import express from "express";
import { client } from "../mongodb.mjs";
const router = express.Router();
const db = client.db("crudDB");
const dbCollection = db.collection("users");

router.post("/login", async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(403).send({ message: "Required Paramater Missing" });
    return;
  }
  const emailInLower = req.body.email.toLowerCase();
  try {
    const result = dbCollection.findOne({ email: emailInLower });
    if (!result) {
      res.status(401).send({ message: "Email or Password incorrect" });
      return;
    } else {
      const isCompare = await varifyHash(req.body.password, result.password);
      if (isCompare) {
        // Genarate a Token
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
router.post("/signup", (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.firstname ||
    !req.body.lastname ||
    !req.body.password
  ) {
    res.status(403).send({ message: "Required Paramater Missing" });
    return;
  }
});

export default router;
