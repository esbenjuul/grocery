import { ObjectId } from "mongodb";
import { db } from "../config/db.ts";

export type TGrocery<T> = {
  _id?: T;
  name: string;
  img: string;
  icon?: string;
  category?: string;
};

export const Grocery = db.getDatabase().collection<TGrocery<ObjectId>>(
  "grocery",
);
