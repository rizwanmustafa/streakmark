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