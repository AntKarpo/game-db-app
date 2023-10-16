import mongoose from "mongoose";

const { Schema } = mongoose;

const gameSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: false },
  studio: { type: String, required: false },
  description: { type: String, required: true },
});

const Games = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Games;