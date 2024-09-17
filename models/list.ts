import { ObjectId } from "mongodb";
import { db } from "../config/db.ts";

export type List<T> = {
  _id?: T;
  owner: ObjectId;
  sharedWith?: ObjectId[];
  name: string;
  tag?: string[];
};

export const List = db.getDatabase().collection<List<ObjectId>>(
  "list",
);

export const createList = async (list: List<ObjectId>) => {
  return List.insertOne(list);
};
