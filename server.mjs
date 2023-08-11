import express from "express";
import path from "path";
import apiv1 from "./APIv1/index.mjs";
import authRouter from "./APIv1/auth.mjs";
import cookieParser from "cookie-parser";
import "dotenv/config";
import Jwt from "jsonwebtoken";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", authRouter);

app.use((req, res, next) => {
  const token = req.cookies.token;
  console.log("token", token);
  try {
    const decoded = Jwt.verify(token, process.env.SECRET);
    console.log("decoded", decoded);
    req.body.decoded = {
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      email: decoded.email,
      isAdmin: decoded.isAdmin,
    };
    next();
  } catch (error) {
    console.log("error ", error);
    res.status(401).send({ message: "invalid token" });
  }
});

app.use("/api/v1", apiv1);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
