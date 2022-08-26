import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
/** As this service will be connecting to the database,
 * it will need to use the MongDB NodeJS driver and .env config. */

export async function connectToDatabase() {
  dotenv.config();

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI!
  );

  await client.connect();

  console.log("Successfully established connection");
}
