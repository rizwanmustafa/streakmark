import { InsertOneResult, ObjectId } from "mongodb";
import { getCollection } from "../init/db";
import MarkError from "../utils/error";
import { getUserWithUid } from "../utils/misc";

export async function addUser(user: StreakMarkServer.User): Promise<InsertOneResult> {
  const prevUser = await getUserWithUid(user.uid);

  if (!prevUser) {
    throw new MarkError(409, `User with uid ${user.uid} already exists!`);
  }

  const userObjectId = new ObjectId();

  const users = getCollection<StreakMarkServer.User>("users");
  return await users.insertOne({ ...user, _id: userObjectId });
}

export async function removeUser(uid: string): Promise<void> {
  const user = await getUserWithUid(uid);

  if (!user) {
    throw new MarkError(404, `User with uid ${uid} does not exist!`);
  }

  const usersCollection = getCollection<StreakMarkServer.User>("users");
  await usersCollection.deleteOne({ uid: uid });

  const feedsCollection = getCollection<StreakMarkServer.Feed>("feeds");
  await feedsCollection.deleteMany({ uid: uid });

  const tasksCollection = getCollection<StreakMarkServer.Task>("tasks");
  await tasksCollection.deleteMany({ uid: uid });

  const boardsCollection = getCollection<StreakMarkServer.Board>("boards");
  await boardsCollection.deleteMany({ uid: uid });

}