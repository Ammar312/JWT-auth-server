import express from "express";
const router = express.Router();

router.get("/login", (req, res, next) => {
  console.log("This is login");
  res.send("This is login v2 " + new Date());
});
router.post("/signup", (req, res, next) => {
  console.log("This is login");
  res.send("This is signup v2 " + new Date());
});

export default router;
