// components/GameDetails.js
import { useRouter } from "next/router";
import styles from "./id.module.css";
import Review from "@/components/Review/Review";
import AddReviewComp from "@/components/add-review";
import useSWR from "swr";

const GameDetails = ({ gameList }) => {
  const router = useRouter();
  const { id } = router.query;

  const selectedGame = gameList.find((game) => game.id == id);

  const { data, error, mutate } = useSWR(`/api/Review/${id}`);

  if (!selectedGame) {
    return <div>Loading...</div>;
  }

  function calculateAverageRating(data) {
    if (!data || data.length === 0) {
      return { fullStars: 0, halfStar: false };
    }

    const totalRating = data.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / data.length;
    const fullStars = Math.floor(averageRating);
    const decimalPart = averageRating - fullStars;
    let halfStar = false;
  
    if (decimalPart >= 0.25 && decimalPart <= 0.75) {
      halfStar = true;
    }
  
    return { fullStars, halfStar };
  }

  const { fullStars, halfStar } = calculateAverageRating(data);

  return (
    <>
      <div className={styles.detailsCard}>
        <h1>{selectedGame.name}</h1>
        <img
          src={selectedGame.background_image}
          alt={`Image for ${selectedGame.name}`}
          width={300}
          height={300}
        />
         <div>
          {[...Array(fullStars)].map((_, index) => (
            <Review key={index} filled={true} />
          ))}
          {halfStar && <Review filled={true} halfStar={true} />}
          {[...Array(10 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
            <Review key={index} filled={false} />
          ))}
        </div>
        <br />
        <p>Metascore rating: {selectedGame.metacritic}</p>
        <p>
          {selectedGame.name} is an{" "}
          {selectedGame.genres.map((genre) => genre.name).join("/")} Game which
          was released on {selectedGame.released}
        </p>
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
      <AddReviewComp reviews={data} gameId={id} mutateReviews={mutate} />
    </>
  );
};

export default GameDetails;
