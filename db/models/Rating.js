import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingSchema = new Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
});

const Rating = mongoose.models.Rating || mongoose.model("Game", ratingSchema);

export default Rating;