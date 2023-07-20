import express from "express";
const router = express.Router();

router.post("/login", (req, res, next) => {
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
