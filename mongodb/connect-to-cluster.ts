import { MongoClient } from "mongodb";
import { load } from "https://deno.land/std@0.212.0/dotenv/mod.ts";

const env = await load();
const uri = env["DB_URI"];

// const uri =
//   `mongodb+srv://esbenmdb:${config.PASSWORD}@cluster0.li5k9u4.mongodb.net/?retryWrites=true&w=majority`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!",
//     );
//     const db = client.db("grocery");
//     const collection = db.collection("list");
//     const findResult = await collection.find().toArray();
//     console.log("Found documents =>", findResult);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

export async function connectToCluster() {
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    console.log("Connecting to MongoDB Atlas cluster...");
    await mongoClient.connect();
    console.log("Successfully connected to MongoDB Atlas!");

    return mongoClient;
  } catch (error) {
    console.error("Connection to MongoDB Atlas failed!", error);
  }
}
