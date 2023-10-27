import dbConnect from "@/db/Connect";
import Review from "@/db/models/Review";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {

    try {

const review = {
  game: request.body.game,
  user: request.body.name,
  rating: request.body.stars,
  review: request.body.text,
}
const createdReview = await Review.create(review);

      response.status(201).json({ status: `${createdReview} and their rating added` });
    } catch (error) {
      response.status(500).json({ error: "An error occurred" });
    }
  } else {
    response.status(405).json({ error: "Method not allowed" });
  }
}
