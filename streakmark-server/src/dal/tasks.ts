import { ObjectId } from "mongodb";
import { getCollection } from "../init/db";
import Logger from "../utils/logger";
import { getUserWithUid, getFeedWithId } from "../utils/misc";

// TODO: Replace these Logger.errors with MarkErrors

export async function addTask(uid: string, task: StreakMarkServer.Task): Promise<void> {

  const user = await getUserWithUid(uid);
  if (!user) {
    Logger.error(`User with uid ${uid} does not exist`);
    return;
  }

  const feed = await getFeedWithId(task.feedId.toString());
  if (!feed) {
    Logger.error(`Feed with id ${task.feedId} does not exist`);
    return;
  }

  if (feed.uid !== uid) {
    Logger.error("User does not own feed");
    return;
  }

  const taskCollection = getCollection<StreakMarkServer.Task>("tasks");
  const taskId = new ObjectId();

  await taskCollection.insertOne({
    _id: taskId,
    ...task,
  });
}

export async function getTasks(uid: string, feedId: string | null): Promise<StreakMarkServer.Task[]> {
  const taskCollection = getCollection<StreakMarkServer.Task>("tasks");
  const query: { uid: string, feedId?: ObjectId } = {
    uid: uid,
  };
  if (feedId) {
    query.feedId = new ObjectId(feedId);
  }
  const cursor = taskCollection.find(query);
  const tasksArray = await cursor.toArray();
  return tasksArray;
}

export async function updateTask(uid: string, taskId: string, newTask: StreakMarkServer.Task): Promise<void> {
  const user = await getUserWithUid(uid);
  if (!user) {
    Logger.error(`User with uid ${uid} does not exist`);
    return;
  }

  const taskCollection = getCollection<StreakMarkServer.Task>("tasks");
  const task = await taskCollection.findOne({ _id: new ObjectId(taskId) });

  if (!task) {
    Logger.error(`Task with id ${taskId} does not exist`);
    return;
  }

  if (task.uid !== uid) {
    Logger.error("User does not own task");
    return;
  }

  const query = {
    uid: uid,
    _id: new ObjectId(taskId),
  };
  const update = {
    $set: newTask,
  };
  await taskCollection.updateOne(query, update);
}

export async function deleteTask(uid: string, taskId: string): Promise<void> {
  const user = await getUserWithUid(uid);
  if (!user) {
    Logger.error(`User with uid ${uid} does not exist`);
    return;
  }

  const taskCollection = getCollection<StreakMarkServer.Task>("tasks");
  const task = await taskCollection.findOne({ _id: new ObjectId(taskId) });

  if (!task) {
    Logger.error(`Task with id ${taskId} does not exist`);
    return;
  }

  if (task.uid !== uid) {
    Logger.error("User does not own task");
    return;
  }

  const query = {
    uid: uid,
    _id: new ObjectId(taskId),
  };
  await taskCollection.deleteOne(query);
}