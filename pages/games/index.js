import Link from "next/link";
import styles from "./Games.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import Review from "@/components/Review/Review";

const GamePage = ({ gameList, loadMoreGames, toggleWishlist, wishlist }) => {
  const router = useRouter();
  const searchQuery = router.query.search || ""; 
  const [rating, setRating] = useState(Array(10).fill(false));

 
  const filteredGameList = gameList.filter(
    (game) =>
      game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStarClick = (index) => {
    const newRating = [...rating];

    for (let i = 0; i <= index; i++) {
      newRating[i] = true;
    }

    setRating(newRating);
  };



console.log(gameList);
  return (
    <main>
      <h2>All the Games in One Place</h2>
      <div className={styles.gameCards}>
        {gameList.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <h3>{game.name}</h3>
            <button onClick={() => toggleWishlist(game)}>
              {wishlist.includes(game.id) ? (
                <img
                  src="/assets/favorite-full.png"
                  width={20}
                  height={20}
                  alt={`Remove from Wishlist`}
                />
              ) : (
                <img
                  src="/assets/favorite-empty.png"
                  width={20}
                  height={20}
                  alt={`Add to Wishlist`}
                />
              )}
            </button>
            <Link href={`/games/${game.id}?name=${game.name}`} key={game.id}>
              <img
                src={game.background_image}
                width={200}
                height={200}
                alt={`Image for ${game.name}`}
              />
            </Link><br/>
            <Link href={`https://store.steampowered.com/?l=german`}>
              <img
              src="/assets/steam-logo.png"
               width={40}  
               height={40}
                alt={`steam-buy`}/>
                </Link>
    
        {rating.map((filled, index) => (
          <Review
            key={index}
            filled={filled}
            onClick={() => handleStarClick(index)}
          />
        ))}
          </div>
        ))}
      </div>
      <div className={styles.centeredButton}>
        <button onClick={loadMoreGames}>Load More Games</button>
      </div>
    </main>
  );
};

export default GamePage;
