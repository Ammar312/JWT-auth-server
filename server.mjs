import express from "express";
import path from "path";
import apiv1 from "./APIv1/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/v1", apiv1);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
