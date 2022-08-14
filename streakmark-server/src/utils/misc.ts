import { Document } from "mongodb";
import { getCollection } from "../init/db";

export async function getUserWithUid(uid: string): Promise<Document | null> {
  const users = await getCollection("users");
  if (!users) return null;

  return users.findOne({ uid });
}

export async function getFeedWithId(feedId: string): Promise<StreakMarkServer.Feed | null> {
  const feeds = await getCollection<StreakMarkServer.Feed>("feeds");



  return feeds.findOne({ feedId });
}