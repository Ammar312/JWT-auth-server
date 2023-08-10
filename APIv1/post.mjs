import express from "express";
import { nanoid } from "nanoid";
import { client } from "../mongodb.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
const dateVar = JSON.stringify(new Date());
const result = dateVar.slice(0, 11);
const db = client.db("crudDB");
const dbCollection = db.collection("posts");

router.get("/post/:postId", (req, res, next) => {
  res.send("This is post " + new Date());
});

router.get("/posts", async (req, res, next) => {
  const allPosts = dbCollection.find({});
  const allPostsIntoArray = await allPosts.toArray();
  console.log("allPostsIntoArray :", allPostsIntoArray);

  res.send(allPostsIntoArray);
});

router.post("/post", async (req, res, next) => {
  if (!req.body.title || !req.body.text) {
    res.status(403).send(`Required parameter missing`);
    return;
  }
  // posts.unshift({ id: nanoid(), title: req.body.title, text: req.body.text });
  let postMaterial = await dbCollection.insertOne({
    id: nanoid(),
    title: req.body.title,
    text: req.body.text,
  });
  console.log("insertResponse: ", postMaterial);

  res.send(`Post Created at ${result}`);
});

router.put("/post/:postId", async (req, res, next) => {
  const id = req.params.postId;
  if (!ObjectId.isValid(id)) {
    res.status(403).send(`Invalid post id`);
    return;
  }
  if (!req.body.title || !req.body.text) {
    res.status(403).send(`Required parameter missing`);
    return;
  }
  let updatedData = {};
  if (req.body.title) {
    updatedData.title = req.body.title;
  }
  if (req.body.text) {
    updatedData.text = req.body.text;
  }

  try {
    const updatedResponse = await dbCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: updatedData,
      }
    );
    res.send("Post Updated Successfully");
  } catch (error) {
    res.status(500).send("server error, please try later");
  }
  console.log(id);
});

router.delete("/post/:postId", async (req, res, next) => {
  const id = req.params.postId;
  try {
    await dbCollection.deleteOne({ _id: new ObjectId(id) });
    res.send("Post Deleted Successfully");
  } catch (error) {
    res.status(404).send("Not Found");
  }
});

export default router;
