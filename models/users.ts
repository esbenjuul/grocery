import { ObjectId } from "mongodb";
import { db } from "../config/db.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export type TUser<T> = {
  _id?: T;
  username: string;
  password: string;
  avatar?: string;
  email?: string;
};

export const User = db.getDatabase().collection<TUser<ObjectId>>("users");

export const comparePasswords = async (
  user: TUser<ObjectId>,
  password: string,
) => {
  return bcrypt.compareSync(password, user.password);
};

export const createSecurePassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.error(err);
  }
};
