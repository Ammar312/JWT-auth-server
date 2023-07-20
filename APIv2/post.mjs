import express from "express";
const router = express.Router();

router.get("/post/:userId/:postId", (req, res, next) => {
  res.send("This is post v2 " + new Date());
});

router.get("/posts/:userId/", (req, res, next) => {
  res.send(`This is user posts v2 ${new Date()}`);
});

router.post("/post", (req, res, next) => {
  res.send(`Post Created v2 ${new Date()}`);
});

router.put("/post/:userId/:postId", (req, res, next) => {
  res.send("post Updated v2 " + new Date());
});

router.delete("/post/:userId/:postId", (req, res, next) => {
  res.send("Post Deleted v2 " + new Date());
});

export default router;
