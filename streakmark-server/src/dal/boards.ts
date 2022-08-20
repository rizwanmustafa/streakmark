import { getUserWithUid } from "../utils/misc";
import { getCollection } from "../init/db";
import { DeleteResult, InsertOneResult, ObjectId, UpdateResult } from "mongodb";
import MarkError from "../utils/error";

export async function addBoard(uid: string, board: StreakMarkServer.Board): Promise<InsertOneResult> {
  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid "${uid}" does not exist`);
  }

  const boardCollection = getCollection<StreakMarkServer.Board>("boards");
  const boardId = new ObjectId();

  return await boardCollection.insertOne({ ...board, _id: boardId });
}

export async function removeBoard(uid: string, boardId: string): Promise<DeleteResult> {
  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid "${uid}" does not exist`);
  }

  const boardCollection = getCollection<StreakMarkServer.Board>("boards");
  const board = await boardCollection.findOne({ _id: new ObjectId(boardId) });

  if (!board) {
    throw new MarkError(404, `Board with id "${boardId}" does not exist`);
  }

  if (board.uid !== uid) {
    throw new MarkError(403, "User does not own board");
  }

  return await boardCollection.deleteOne({ _id: new ObjectId(boardId) });
}

export async function getBoards(uid: string, boardId: string | null): Promise<StreakMarkServer.Board[]> {
  const boardCollection = getCollection<StreakMarkServer.Board>("boards");
  const query: { uid: string, _id?: ObjectId } = {
    uid: uid,
  };

  if (boardId) {
    query._id = new ObjectId(boardId);
  }

  const cursor = boardCollection.find(query);
  const boardArray = await cursor.toArray();

  return boardArray;
}

export async function updateBoard(uid: string, boardId: string, newBoard: StreakMarkServer.Board): Promise<UpdateResult> {
  const user = await getUserWithUid(uid);
  if (!user) {
    throw new MarkError(404, `User with uid "${uid}" does not exist`);
  }

  const boardCollection = getCollection<StreakMarkServer.Board>("boards");
  const boardObjectId = new ObjectId(boardId);
  const board = await boardCollection.findOne({ _id: boardObjectId });

  if (!board) {
    throw new MarkError(404, `Board with id "${boardId}" does not exist`);
  }

  if (board.uid !== uid) {
    throw new MarkError(403, "User does not own board");
  }

  const query = { _id: boardObjectId };
  const update = { $set: { ...newBoard } };

  return await boardCollection.updateOne(query, update);
}