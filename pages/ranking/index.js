import React from "react";

const RankingPage = ({ gameList, wishlist, toggleWishlist }) => {

  const rankedGames = gameList
    .slice().sort((a, b) => b.metacritic - a.metacritic);

  const topTenGames = rankedGames.slice(0, 100);

  return (
    <main>
      <h3>The Top 100 Games based on Metacritic Score</h3>
      <div>
        {topTenGames.map((game, index) => (
          <div key={game.id}>
              <h3>{index + 1}. {game.name}</h3>
             <img
                src={game.background_image}
                width={200}
                height={200}
                alt={`Image for ${game.name}`}
              />
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
            <p>Metacritic Score: {game.metacritic}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default RankingPage;
