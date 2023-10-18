import React, { useState, useEffect } from "react";

const gamePage = () => {
  const [gameList, setGameList] = useState([]);


  useEffect(() => {
    async function fetchAllGames() {
      try {
        const response = await fetch(`https://api.rawg.io/api/games?key=27257cb0d3da4a78b072bd0bc225adb6`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setGameList(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAllGames();
  }, []);

console.log(gameList);

  return (
    <main>
      <h2>All the Games in one Place</h2>
      <ul>
        {gameList.map((game) => (
            <li key={game.id}>
            <img 
          src={game.background_image} 
          width={200} 
          height={200} 
          alt={`Image for ${game.name}`} />{game.name}</li>
        ))}
      </ul>
    </main>
  );
};

export default gamePage;
