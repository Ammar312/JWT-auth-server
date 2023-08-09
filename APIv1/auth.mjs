import express from "express";
import { client } from "../mongodb.mjs";
const router = express.Router();

router.post("/login", (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    res.status(403).send({ message: "Required Paramater Missing" });
    return;
  }
  const emailInLower = req.body.email.toLowerCase();

  res.send("This is login v1 " + new Date());
});
router.post("/signup", (req, res, next) => {
  res.send(
    `This is signup v1 with email: ${req.body.email} and password ${
      req.body.password
    }  ${new Date()}`
  );
});

export default router;
