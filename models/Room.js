import mongoose from "mongoose";
import { userAgent } from "next/server";
import { type } from "os";

const UserSchema = new mongoose.Schema({
  name: String,
  picked: { type: Boolean, default: false },
});

const RoomSchema = new mongoose.Schema({
  roomId: String,
  users: [UserSchema],
});

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
