import { ObjectId } from "mongodb";
import { getCollection } from "../init/db";
import Logger from "../utils/logger";
import { getUserWithUid, getFeedWithId } from "../utils/misc";

// TODO: Replace these Logger.warnings with MarkErrors

export async function addTask(uid: string, task: StreakMarkServer.Task): Promise<void> {

  const user = await getUserWithUid(uid);
  if (!user) {
    Logger.warning(`User with uid ${uid} does not exist`);
    return;
  }

  const feed = await getFeedWithId(task.feedId.toString());
  if (!feed) {
    Logger.warning(`Feed with id ${task.feedId} does not exist`);
    return;
  }

  if (feed.uid !== uid) {
    Logger.error("User does not own feed");
    return;
  }

  const tasks = getCollection("tasks");
  const taskId = new ObjectId();

  await tasks.insertOne({
    _id: taskId,
    ...task,
  });
}

export async function getTasks(uid: string, feedId: string | null): Promise<StreakMarkServer.Task[]> {
  const tasks = getCollection<StreakMarkServer.Task>("tasks");
  const query: { uid: string, feedId?: ObjectId } = {
    uid: uid,
  };
  if (feedId) {
    query.feedId = new ObjectId(feedId);
  }
  const cursor = tasks.find(query);
  const tasksArray = await cursor.toArray();
  return tasksArray;
}

export async function updateTask(uid: string, taskId: string, task: StreakMarkServer.Task): Promise<void> {
  const tasks = getCollection("tasks");
  const query = {
    uid: uid,
    _id: new ObjectId(taskId),
  };
  const update = {
    $set: task,
  };
  await tasks.updateOne(query, update, { upsert: false });
}

export async function deleteTask(uid: string, taskId: string): Promise<void> {
  const tasks = getCollection("tasks");
  const query = {
    uid: uid,
    _id: new ObjectId(taskId),
  };
  await tasks.deleteOne(query);
}