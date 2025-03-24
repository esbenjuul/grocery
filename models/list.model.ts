import { ObjectId } from "mongodb";
import { db } from "@/config/db.ts";

export type List<T> = {
  _id: T;
  owner: ObjectId;
  sharedWith?: ObjectId[];
  name: string;
  tag?: string[];
};

export const listCollection = db.getDatabase().collection<List<ObjectId>>(
  "list",
);
