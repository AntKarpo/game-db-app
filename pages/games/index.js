import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./Games.module.css";

const GamePage = () => {
  const [gameList, setGameList] = useState([]);
  const [page, setPage] = useState(0); 


  const fetchGames = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=27257cb0d3da4a78b072bd0bc225adb6&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const data = await response.json();
      setGameList((prevGameList) => [...prevGameList, ...data.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const loadMoreGames = () => {
    setPage(page + 1);
  };
console.log(gameList);
  return (
    <main>
      <h2>All the Games in One Place</h2>
      <div className={styles.gameCards}>
        {gameList.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <h3>{game.name}</h3>
            <Link href={`/games/${game.id}?name=${game.name}&image=${game.background_image}&metascore=${game.metacritic
}`} key={game.id}>
    <img
      src={game.background_image}
      width={200}
      height={200}
      alt={`Image for ${game.name}`}
    />
</Link>
          </div>
        ))}
      </div>
      <button onClick={loadMoreGames}>Load More Games</button>
    </main>
  );
};

export default GamePage;
