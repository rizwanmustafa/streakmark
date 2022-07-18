import { MongoClient, Db } from "mongodb";
import Logger from "../utils/logger";

export let mongoClient: MongoClient | null = null;
export let mongoDB: Db | null = null;

export async function connectToDB(): Promise<void> {
  const mongoUrl =
    process.env.STREAKMARK_SERVER_MONGO_URL ?? "mongodb://localhost:27017";
  const dbName = process.env.STREAKMARK_SERVER_DB_NAME ?? "streakmark";

  Logger.info(`Begin connecting to MongoDB using URI: ${mongoUrl}`);

  try {
    const client = new MongoClient(mongoUrl);

    await client.connect();

    Logger.success("Successfully connected to MongoDB");

    mongoClient = client;
    mongoDB = client.db(dbName);
  } catch (err) {
    Logger.error((err as Error).message);
    process.exit(1);
  }
}