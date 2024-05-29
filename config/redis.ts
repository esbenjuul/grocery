import { connect } from "redis";

export const redis = await connect({
  hostname: "localhost",
  port: 6379,
});
