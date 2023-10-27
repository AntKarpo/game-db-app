import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./id.module.css";
import Review from "@/components/Review/Review";
import AddReviewComp from "@/components/add-review";

const GameDetails = ({ gameList}) => {
  const router = useRouter();
  const { id } = router.query; 
  const [reviews, setReviews] = useState([]);
  console.log(reviews, "reviews");
  const [newReview, setNewReview] = useState({
    name: "",
    text: "",
    stars: Array(10).fill(false),
  });
  const selectedGame = gameList.find((game) => game.id === parseInt(id));

  if (!selectedGame) {
    return <div>Loading...</div>;
  }


 const submitReview = async() => {
 const ReviewWithGameId = {...newReview, game: selectedGame.id}
  const response = await fetch(`/api/Review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ReviewWithGameId),
  });

  if (response.ok) {
   
  } else {
    console.error("Error creating review:", response.status);
  }

  if (newReview.name.trim() === "" || newReview.text.trim() === "") {
    alert("Name and Review are required.");
    return;
  }
  if (newReview.text.length <= 100) {
    alert("Review has to be at least 100 Letters.");
    return;
  }
  if (newReview.stars.filter((star) => star === true).length === 0) {
    alert("Please give a rating.");
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

  function calculateAverageRating(reviews) {

    if (!reviews || reviews.length === 0) return 0;
  
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    const averageRating = totalStars / reviews.length;
    return averageRating;
  }
  

  function generateAverageRatingStars(averageRating) {
    const filledStars = Math.floor(averageRating); 
    const hasHalfStar = averageRating % 1 !== 0;
  
    const stars = [];
  
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Review key={`star-full-${i}`} src={"/assets/star-full.png"} />);
    }
  
    if (hasHalfStar) {
      stars.push(<Review key="half-star" src={"/assets/half-star.png"} />);
    }
  
    for (let i = 0; i < 10 - filledStars - (hasHalfStar ? 1 : 0); i++) {
      stars.push(<Review key={`star-empty-${i}`} src={"/assets/star-empty.png"} />);
    }
  
    return stars;
  }
  
  const averageRating = calculateAverageRating(reviews);
  const averageRatingStars = generateAverageRatingStars(averageRating);
console.log("average",averageRating);
console.log("averageRatingStars", averageRatingStars);

  return (
    <>
    <div className={styles.detailsCard}>
      <h1>{selectedGame.name}</h1>
      <img
        src={selectedGame.background_image}
        alt={`Image for ${selectedGame.name}`}
        width={300}
        height={300}
      /><br/>
  {averageRatingStars}
      <p>Metascore rating: {selectedGame.metacritic}</p>
      <div>
        {selectedGame.short_screenshots?.map((screenshot, index) => (
          <img
            className={styles.screenshotsContainer}
            key={index}
            src={screenshot.image}
            alt={`Screenshot for ${selectedGame.name}`}
            width={150}
            height={120}
          />
        ))}
      </div>
    </div>
      <AddReviewComp 
      reviews={reviews} 
      newReview={newReview} 
      setNewReview={setNewReview} 
      submitReview={submitReview} 
      handleStarClick={handleStarClick}/>
    </>
  );
};

export default GameDetails;
