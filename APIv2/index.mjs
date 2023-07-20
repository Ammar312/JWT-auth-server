import express from "express";
let router = express.Router();

import authRouter from "./auth.mjs";
import commentRouter from "./comment.mjs";
import feedRouter from "./feed.mjs";
import postRouter from "./post.mjs";

router.use(authRouter);

router.use(commentRouter);
router.use(postRouter);
router.use(feedRouter);

export default router;
