import express from "express";
import path from "path";
import apiv1 from "./APIv1/index.mjs";
import authRouter from "./APIv1/auth.mjs";
import cookieParser from "cookie-parser";
import "dotenv/config";
import jwt from "jsonwebtoken";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authRouter);

app.use((req, res, next) => {
  const token = req.cookies.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
  } catch (error) {}
});

app.use("/api/v1", apiv1);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
