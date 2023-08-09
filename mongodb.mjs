import { MongoClient } from "mongodb";
const uri =
  "mongodb+srv://db123:beta%4012345@cluster0.4vcwf6g.mongodb.net/?retryWrites=true&w=majority";

// Connect to your Atlas cluster
export const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to Atlas");
  } catch (err) {
    console.log(err.stack);
    await client.close();
    process.exit(1);
  }
}
run().catch(console.dir);
process.on("SIGINT", async function () {
  console.log("app is terminating");
  await client.close();
  process.exit(0);
});
