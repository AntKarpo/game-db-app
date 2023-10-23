import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
  rating: {type: [Schema.Types.ObjectId], ref:"Rating"}
});

const User = mongoose.models.User || mongoose.model("Game", UserSchema);

export default User;