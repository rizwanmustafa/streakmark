import { getUserWithUid } from "../utils/misc";
import { getCollection } from "../init/db";
import { DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import MarkError from "../utils/error";

export async function addFeed(uid: string, feed: StreakMarkServer.Feed): Promise<InsertOneResult> {
  const user = getUserWithUid(uid);

  if (!user) {
    throw new MarkError(404, `User with uid "${uid}" does not exist!`);
  }

  if (feed.uid !== uid) {
    throw new MarkError(403, "User does not own feed!");
  }

  const feeds = getCollection<StreakMarkServer.Feed>("feeds");
  const feedId = new ObjectId();

  return await feeds.insertOne({
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

export async function updateFeed(uid: string, feedId: string, newFeed: StreakMarkServer.Feed): Promise<UpdateResult> {
  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid "${uid}" does not exist`);
  }

  const feedCollection = getCollection<StreakMarkServer.Feed>("feeds");
  const feedObjectId = new ObjectId(feedId);
  const feed = await feedCollection.findOne({ _id: feedObjectId });

  if (!feed) {
    throw new MarkError(404, `Feed with id "${feedId}" does not exist`);
  }

  if (feed.uid !== uid) {
    throw new MarkError(403, "User does not own feed!");
  }

  const query = {
    uid: uid,
    _id: feedObjectId
  };
  const update = {
    $set: newFeed,
  };

  return await feedCollection.updateOne(query, update);

}

export async function removeFeed(uid: string, feedId: string): Promise<DeleteResult> {
  const user = getUserWithUid(uid);

  if (!user) {
    throw new MarkError(404, `User with uid "${uid}" does not exist!`);
  }

  const feedCollection = getCollection<StreakMarkServer.Feed>("feeds");
  const feedObjectId = new ObjectId(feedId);
  const feed = await feedCollection.findOne({ _id: feedObjectId });

  if (!feed) {
    throw new MarkError(404, `Feed with id "${feedId}" does not exist!`);
  }

  if (feed.uid !== uid) {
    throw new MarkError(403, "User does not own feed!");
  }

  return await feedCollection.deleteOne({
    uid: uid,
    _id: feedObjectId
  });
}