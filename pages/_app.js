import React, { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";


export default function App({ Component, pageProps }) {
  const [gameList, setGameList] = useState([]);
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
 
  const toggleWishlist = (game) => {
    if (wishlist.includes(game.id)) {
     
      setWishlist(wishlist.filter((id) => id !== game.id));
    } else {
  
      setWishlist([...wishlist, game.id]);
    }
  };
  
  const fetchGames = async (page) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=27257cb0d3da4a78b072bd0bc225adb6&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
      setGameList([...gameList, ...data.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  function loadMoreGames() {
    setPage(page + 1);
  };
  
  useEffect(() => {
    fetchGames(page);
  }, [page]);

  return (
    <>
      <Header gameList={gameList} />
      <Component {...pageProps} 
      gameList={gameList}
      loadMoreGames={loadMoreGames} 
      toggleWishlist={toggleWishlist}
      wishlist={wishlist} />
      <Footer />
    </>
  );
}
