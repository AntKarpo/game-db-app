import mongoose from "mongoose";

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  game: {type: Number, required: true },
  user: { type: String, required: true },
  review: { type: String, required: true },
  rating: {type: Array, required: true}
});

const Review = mongoose.models.Review || mongoose.model("Review", ReviewSchema);

export default Review;