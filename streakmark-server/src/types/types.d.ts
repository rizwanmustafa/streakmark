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
    title: string;
    description: string;
  }

  interface Task {
    title: string;
    completionDate: string;
    feedId: ObjectId;
  }

  interface Board {
    title: string;
    description: string;
    feedIds: ObjectId[];
  }
}