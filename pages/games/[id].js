import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./id.module.css";
import Review from "@/components/Review/Review";
import AddReviewPage from "../add-review";

const GameDetails = ({ gameList, reviews }) => {
  const router = useRouter();
  const { id } = router.query; 
  const [rating, setRating] = useState(Array(10).fill());

  const handleReviewButton=()=> {
    router.push("/add-review")
  }  


  const selectedGame = gameList.find((game) => game.id === parseInt(id));

  if (!selectedGame) {
    return <div>Loading...</div>;
  }



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
      <button className={styles.reviewButton} onClick={handleReviewButton}>+ Add Review</button><br/>
        {rating.map((filled, index) => (
            <Review
              key={index}
              filled={filled}
              onClick={() => toggleStarClick(index)}
            />
          ))}
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
      <AddReviewPage reviews={reviews}/>
    </>
  );
};

export default GameDetails;
