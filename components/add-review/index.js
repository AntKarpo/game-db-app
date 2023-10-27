// components/AddReviewComp.js
import React, { useState } from "react";
import Review from "@/components/Review/Review";

export default function AddReviewComp({ reviews, gameId, mutateReviews }) {
  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState({
    user: "",
    review: "",
  });

  const submitReview = async (evt) => {
    evt.preventDefault();
    const data = {
      user: newReview.user,
      review: newReview.review,
      rating: rating,
      game: gameId,
    };

    const response = await fetch(`/api/Review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setNewReview({ user: "", review: "" });
      setRating(0);
      mutateReviews();
    } else {
      console.error("Error creating review:", response.status);
    }
  };

  const handleStarClick = (index) => {
    setRating(index);
  };

  return (
    <main>
      <div>
        {reviews?.map((review, index) => (
          <div key={index}>
            <h4>{review.user}</h4>
            <div>
              {Array(review.rating).fill(true).map((filled, index) => (
                <Review key={index} filled={filled} />
              ))}
            </div>
            <p>{review.review}</p>
          </div>
        ))}
        <h1>Add Review</h1>
        <form onSubmit={submitReview}>
<input type="number" max={10}name="rating" required min={0}/>
          <input
            style={{ margin: "5px" }}
            type="text"
            placeholder="Name"
            name="user"
            value={newReview.user}
            onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
            required
          />
          <br />
          <textarea
            name="review"
            placeholder="Write your review here..."
            rows="4"
            cols="50"
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
            required
          />
          <button>Submit Review</button>
        </form>
      </div>
    </main>
  );
}
       /*  {[...Array(10)].map((star, index) => (
            <Review
              key={index}
              filled={filled}
              onStarClick={() => handleStarClick(index)}
            />
          ))}*/