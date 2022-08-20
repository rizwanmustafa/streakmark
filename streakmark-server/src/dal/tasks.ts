import { DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import { getCollection } from "../init/db";
import MarkError from "../utils/error";
import { getUserWithUid, getFeedWithId } from "../utils/misc";

export async function addTask(uid: string, task: StreakMarkServer.Task): Promise<InsertOneResult> {

  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid ${uid} does not exist`);
  }

  const feed = await getFeedWithId(task.feedId.toString());
  if (!feed) {
    throw new MarkError(404, `Feed with id ${task.feedId} does not exist`);
  }

  if (feed.uid !== uid) {
    throw new MarkError(403, "User does not own feed");
  }

  const taskCollection = getCollection<StreakMarkServer.Task>("tasks");
  const taskId = new ObjectId();

  return await taskCollection.insertOne({
    _id: taskId,
    ...task,
  });
}

export async function getTasks(uid: string, feedId: string | null): Promise<StreakMarkServer.Task[]> {
  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid ${uid} does not exist`);
  }

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

export async function updateTask(uid: string, taskId: string, newTask: StreakMarkServer.Task): Promise<UpdateResult> {
  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid ${uid} does not exist`);
  }

  const taskCollection = getCollection<StreakMarkServer.Task>("tasks");
  const task = await taskCollection.findOne({ _id: new ObjectId(taskId) });

  if (!task) {
    throw new MarkError(404, `Task with id ${taskId} does not exist`);
  }

  if (task.uid !== uid) {
    throw new MarkError(403, "User does not own task");
  }

  const query = {
    uid: uid,
    _id: new ObjectId(taskId),
  };
  const update = {
    $set: newTask,
  };
  return await taskCollection.updateOne(query, update);
}

export async function deleteTask(uid: string, taskId: string): Promise<DeleteResult> {
  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid ${uid} does not exist`);
  }

  const taskCollection = getCollection<StreakMarkServer.Task>("tasks");
  const task = await taskCollection.findOne({ _id: new ObjectId(taskId) });

  if (!task) {
    throw new MarkError(404, `Task with id ${taskId} does not exist`);
  }

  if (task.uid !== uid) {
    throw new MarkError(403, "User does not own task");
  }

  const query = {
    uid: uid,
    _id: new ObjectId(taskId),
  };

  return await taskCollection.deleteOne(query);
}