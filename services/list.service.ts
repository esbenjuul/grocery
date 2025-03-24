import { BSON, ObjectId } from "mongodb";
import { db } from "../config/db.ts";
import { List, listCollection } from "@/models/list.model.ts";

/**
 * Create new grocery list
 * @param list
 * @returns
 */
export const createList = async (list: Omit<List<ObjectId>, "_id">) => {
  return listCollection.insertOne({
    _id: new ObjectId(),
    ...list,
  });
};
/**
 * get list from owner ID
 * @param id
 * @returns
 */
export const getListFromOwnerId = async (
  id: string,
): Promise<List<ObjectId>[]> => {
  const lists = await listCollection.find({ owner: new BSON.ObjectId(id) })
    .toArray();

  return lists;
};

export const deleteListById = async (id: string): Promise<boolean> => {
  const { deletedCount } = await listCollection.deleteOne({
    _id: new ObjectId(id),
  });

  return deletedCount > 0;
};
