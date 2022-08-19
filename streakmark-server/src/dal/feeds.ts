import Logger from "../utils/logger";
import { getUserWithUid } from "../utils/misc";
import { getCollection } from "../init/db";
import { ObjectId } from "mongodb";

// TODO: Replace Logger calls with MarkErrors

export async function addFeed(uid: string, feed: StreakMarkServer.Feed): Promise<void> {
  const user = getUserWithUid(uid);

  if (!user) {
    Logger.error(`User with uid ${uid} does not exist!`);
    return;
  }

  if (feed.uid !== uid) {
    Logger.error(`User cannot perform this operation!`);
  }

  const feeds = getCollection<StreakMarkServer.Feed>("feeds");
  const feedId = new ObjectId();

  await feeds.insertOne({
    _id: feedId,
    ...feed
  });
}

export async function getFeeds(uid: string, feedId: string | null): Promise<StreakMarkServer.Feed[]> {
  const tasks = getCollection<StreakMarkServer.Feed>("feeds");

  const query: { uid: string, _id?: ObjectId } = {
    uid: uid,
  };

  if (feedId) {
    query._id = new ObjectId(feedId);
  }
  const cursor = tasks.find(query);
  const feedArray = await cursor.toArray();

  return feedArray;
}

export async function updateFeed(uid: string, feedId: string, newFeed: StreakMarkServer.Feed): Promise<void> {
  const user = await getUserWithUid(uid);
  if (!user) {
    Logger.error(`User with uid ${uid} does not exist`);
    return;
  }

  const feedCollection = getCollection<StreakMarkServer.Feed>("feeds");
  const feedObjectId = new ObjectId(feedId);
  const feed = await feedCollection.findOne({ _id: feedObjectId });

  if (!feed) {
    Logger.error(`Feed with id ${feedId} does not exist`);
    return;
  }

  if (feed.uid !== uid) {
    Logger.error(`User does not own feed!`);
    return;
  }

  const query = {
    uid: uid,
    _id: feedObjectId
  };
  const update = {
    $set: newFeed,
  };
  await feedCollection.updateOne(query, update);

}

export async function removeFeed(uid: string, feedId: string): Promise<void> {
  const user = getUserWithUid(uid);

  if (!user) {
    Logger.error(`User with uid ${uid} does not exist!`);
    return;
  }

  const feedCollection = getCollection<StreakMarkServer.Feed>("feeds");
  const feedObjectId = new ObjectId(feedId);
  const feed = await feedCollection.findOne({ _id: feedObjectId });

  if (!feed) {
    Logger.error(`Feed with id ${feedId} does not exist!`);
    return;
  }

  if (feed.uid !== uid) {
    Logger.error("User does not own feed!");
  }

  await feedCollection.deleteOne({
    uid: uid,
    _id: feedObjectId
  })
}