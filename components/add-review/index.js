import React, { useState } from "react";
import Review from "@/components/Review/Review";

export default function AddReviewComp({reviews, newReview, setNewReview, submitReview, handleStarClick}) {
  
  return (
    <main>
      <div>
        {reviews.map((review, index) => (
          <div key={index}>
            <h4>{review.name}</h4>
            <div>
              {Array(review.stars).fill(true).map((filled, index) => (
                <Review key={index} filled={filled} />
              ))}
            </div>
            <p>{review.text}</p>
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
