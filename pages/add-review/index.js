import { useState } from "react";
import Review from "@/components/Review/Review";
import GameDetails from "../games/[id]";


export default function AddReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    stars: Array(10).fill(false),
  });

  const submitReview = () => {
    if (newReview.name.trim() === "" || newReview.text.trim() === "") {
      alert("Name and Review are required.");
      return;
    }
    if (newReview.text.length <= 100){
        alert("Review has to be at least 100 Letters.")
        return;
    }
    const reviewWithFilledStars = {
      ...newReview,
      stars: newReview.stars.filter((star) => star === true).length,
    };

    setReviews([...reviews, reviewWithFilledStars]);

    setNewReview({
        name: "",
      text: "",
      stars: Array(10).fill(false),
    });
  };


  const handleStarClick = (index) => {
      const updatedStars = newReview.stars.map((_, i) => (i <= index ? true : false));
    setNewReview({ ...newReview, stars: updatedStars });
  };

  return (
      <main>
        <div>
          {reviews.map((review, index) => (
            <div key={index}>
              <h4>{review.name}</h4>
              <p>{review.text}</p>
              <div>
                {Array(review.stars).fill(true).map((filled, index) => (
                  <Review key={index} filled={filled} />
                ))}
              </div>
            </div>
          ))}
      <h1>Add Review</h1>
      <form id="textarea">
        <input
          style={{ margin: "5px" }}
          type="text"
          placeholder="Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          required
        />
        <br />
        <textarea
          id="textarea"
          name="textarea"
          placeholder="Write your review here..."
          rows="4" cols="50"
          value={newReview.text}
          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          required
        />
      </form>
      <div>
        {newReview.stars.map((filled, index) => (
          <Review
            key={index}
            filled={filled}
            onStarClick={() => handleStarClick(index)}
          />
        ))}
      </div>

      <button onClick={submitReview}>Submit Review</button>

      </div>
    </main>
  );
}
