type ObjectId = import("mongodb").ObjectId;

declare namespace StreakMarkServer {

  interface User {
    uid: string;
    username: string;
    email: string;
    hashedPassword: string;
    creationDate: string;
  }

  interface Feed {
    uid: string;
    title: string;
    description: string;
  }

  interface Task {
    uid: string;
    title: string;
    completionDate: string;
    feedId: ObjectId;
  }

  interface Board {
    uid: string;
    title: string;
    description: string;
    feedIds: ObjectId[];
  }
}