import React from "react";
import styles from "./wishlist.module.css";
import Link from "next/link";

const WishlistPage = ({ wishlist, gameList, toggleWishlist }) => {

    console.log(wishlist);
  const wishlistGames = gameList.filter((game) => wishlist.includes(game.id));

  return (
    <main>
      <h3>Wishlist</h3>
      <div className={styles.gameCards}>
        {wishlistGames.map((game) => (
          <div key={game.id}  className={styles.gameCard}>
            <h3>{game.name}</h3>
            <Link href={`/games/${game.id}?name=${game.name}`} key={game.id}>
            <img
              src={game.background_image}
              width={200}
              height={200}
              alt={`Image for ${game.name}`}
            />
             </Link>
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
          </div>
        ))}
      </div>
    </main>
  );
};

export default WishlistPage;
