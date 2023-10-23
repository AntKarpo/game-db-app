import React from "react";
import { useRouter } from "next/router";
import styles from "./id.module.css";

const GameDetails = ({ gameList }) => {
  const router = useRouter();
  const { id } = router.query; 

  const handleReviewButton=()=> {
    router.push("/add-review")
  }
  
  const selectedGame = gameList.find((game) => game.id === parseInt(id));

  if (!selectedGame) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.detailsCard}>
      <h1>{selectedGame.name}</h1>
      <img
        src={selectedGame.background_image}
        alt={`Image for ${selectedGame.name}`}
        width={300}
        height={300}
      /><br/>
      <button className={styles.reviewButton} onClick={handleReviewButton}>+ Add Review</button>
      <p>Metascore rating: {selectedGame.metascore}</p>
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
  );
};

export default GameDetails;
