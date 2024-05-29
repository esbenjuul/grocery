import { ObjectId } from "npm:mongodb";
import { db } from "../config/db.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

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
  return bcrypt.compare(password, user.password);
};

export const createSecurePassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt();
    console.log(salt);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    console.error(err);
  }
};
