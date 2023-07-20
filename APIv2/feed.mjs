import express from "express";
const router = express.Router();

router.get("/feed/:userId", (req, res, next) => {
  res.send("This is User feed v2 " + new Date());
});

export default router;
