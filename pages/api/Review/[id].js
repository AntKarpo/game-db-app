// pages/api/Review.js
import dbConnect from "@/db/Connect";
import Review from "@/db/models/Review";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const gameId = request.query.id;

    try {
      const reviews = await Review.find({ game: gameId });
      response.status(200).json(reviews);
    } catch (error) {
      response.status(500).json({ error: "An error occurred" });
    }
  } else if (request.method === "POST") {
    console.log("body", request.body);
    const { user, review, rating, game } = request.body;

    try {
      const newReview = Review.create({
        user,
        review,
        rating,
        game,
      });
      console.log("newReview", newReview);
      await newReview.save();

      response.status(201).json(newReview);
    } catch (error) {
      response.status(500).json({ error: "An error occurred" });
    }
  }
  if (request.method === "DELETE") {
    const { id } = request.query;

    try {
      await Review.findByIdAndDelete(id);
      response.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      response.status(500).json({ error: "An error occurred while deleting the review" });
    }
  }
}
