import { MongoClient } from "mongodb";
import Logger from "../utils/logger";

export let mongoClient: MongoClient | null = null;

export async function connectToDB(): Promise<MongoClient> {
  const mongoUrl =
    process.env.STREAKMARK_SERVER_MONGO_URL || "mongodb://localhost:27017";
  Logger.info(`Begin connecting to MongoDB using URI: ${mongoUrl}`);

  try {
    const client = new MongoClient(mongoUrl);

    await client.connect();

    Logger.success("Successfully connected to MongoDB");

    mongoClient = client;
    return client;
  } catch (err) {
    Logger.error((err as Error).message);
    process.exit(1);
  }
}

export default connectToDB;
