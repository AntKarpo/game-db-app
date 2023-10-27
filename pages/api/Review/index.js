import dbConnect from "@/db/Connect";
import Review from "@/db/models/Review";

export default async function handler(request, response) {
  await dbConnect();

  try {
  if (request.method === "POST") {

const review = {
  game: request.body.game,
  user: request.body.user,
  rating: request.body.rating,
  review: request.body.review,
}
const createdReview = await Review.create(review);

response.status(201).json({ status: `${createdReview} and their rating added` });
}

}
  catch (error) {
      response.status(500).json({ error: "An error occurred" });
    }
  } 


