// components/GameDetails.js
import { useRouter } from "next/router";
import styles from "./id.module.css";
import Review from "@/components/Review/Review";
import AddReviewComp from "@/components/add-review";
import useSWR from "swr";

const GameDetails = ({ gameList }) => {
  const router = useRouter();
  const { id } = router.query;
  const selectedGame = gameList.find((game) => game.id === parseInt(id));

  const { data, error, mutate } = useSWR(`/api/Review?id=${id}`);

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
        />
        <br />
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
      <AddReviewComp reviews={data} gameId={id} mutateReviews={mutate} />
    </>
  );
};

export default GameDetails;
