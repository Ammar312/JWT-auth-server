import express from "express";
const router = express.Router();

// router.get("/comment", (req, res, next) => {
//   res.send("This is comment " + new Date());
// });
router.get("/comment/:postId/:commentId", (req, res, next) => {
  res.send("This is comment v2 " + new Date());
});

router.get("/comments/:postId/", (req, res, next) => {
  res.send("This is post comments v2 " + new Date());
});

router.put("/comment/:postId/:commentId", (req, res, next) => {
  res.send("Comment Updated v2 " + new Date());
});

router.delete("/comment/:postId/:commentId", (req, res, next) => {
  res.send("Comment Deleted v2 " + new Date());
});

export default router;
