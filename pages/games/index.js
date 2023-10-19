import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Games.module.css";

const fetchGames = async (page) => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=27257cb0d3da4a78b072bd0bc225adb6&page=${page}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
  console.log("data",data);
    return data.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const GamePage = () => {
  const [gameList, setGameList] = useState([]);
  const [page, setPage] = useState(1); 



  useEffect(() => {
    async function fetchData(){
   const newGames = await fetchGames(page);
  console.log("newGames",newGames);
          setGameList([...gameList, ...newGames])}
          fetchData()
}, [page]);

  const loadMoreGames = () => {
    setPage(page + 1);
  };

if(!gameList) return
  return (
    <main>
      <h2>All the Games in One Place</h2>
      <div className={styles.gameCards}>
        {gameList.map((game) => (
          <div key={game.id} className={styles.gameCard}>
            <h3>{game.name}</h3>
            <Link
            href={`/games/${game.id}?name=${game.name}&image=${game.background_image}&metascore=${game.metacritic}&screenshots=${JSON.stringify(
              game.short_screenshots.map((screenshot) => screenshot.image))}`}
              key={game.id}
              >
      
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
<div className={styles.centeredButton}>
      <button onClick={loadMoreGames}>Load More Games</button>
      </div>
    </main>
  );
};

export default GamePage;
