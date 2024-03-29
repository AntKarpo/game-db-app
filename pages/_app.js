import React, { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps}) {
  const [gameList, setGameList] = useState([]);
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [totalItems, setTotalItems] = useState(null); 
  const [searchQuery, setSearchQuery] = useState("");
  


  const toggleWishlist = (game) => {
    let updatedWishlist;
    if (wishlist.includes(game.id)) {
      updatedWishlist = wishlist.filter((id) => id !== game.id);
    } else {
      updatedWishlist = [...wishlist, game.id];
    }
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };
  const fetchGames = async (page) => {
    try {
      const pageSize = 40; 

      const response = await fetch(
        `https://api.rawg.io/api/games?key=27257cb0d3da4a78b072bd0bc225adb6&page=${page}&page_size=${pageSize}`
      );

      
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

    
      if (totalItems === null) {
        setTotalItems(data.count);
      }

      
      setGameList([...gameList, ...data.results]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function loadMoreGames() {
 
    if (gameList.length < totalItems) {
      setPage(page + 1);
    }
  }

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  
  
    fetchGames(page);
  }, [page]);
  return (
    <>
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <Header 
      gameList={gameList} 
      setSearchQuery={setSearchQuery} 
      searchQuery={searchQuery}
      />
      <Component 
      {...pageProps} 
      gameList={gameList} 
      loadMoreGames={loadMoreGames} 
      toggleWishlist={toggleWishlist} 
      wishlist={wishlist}
      searchQuery={searchQuery} />
      <Footer />
      </SWRConfig>
    </>
  );
}
