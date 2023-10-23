import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  name: { type: String, required: true },
  review: { type: String, required: true },
});

const Reviews = mongoose.models.Review || mongoose.model("Game", reviewSchema);

export default Reviews;