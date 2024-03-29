import styles from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
import {  useRouter } from "next/router";


  export default function Header({searchQuery, setSearchQuery}) {
    const [searchButtonPressed, setSearchButtonPressed] = useState(false);
    const [gameButtonPressed, setGameButtonPressed] = useState(false);
    const [rankButtonPressed, setRankButtonPressed] = useState(false);
    const [loginButtonPressed, setLoginButtonPressed] = useState(false);
    const [wishlistButtonPressed, setWishlistButtonPressed] =useState(false);

    const router = useRouter();
    const handleSearchButtonClick = (e) => {
      e.preventDefault(); 
      setSearchButtonPressed(true);
      router.push(`/games?search=${searchQuery}`);
    };

  const handleGameButtonClick = () => {
    setGameButtonPressed(true);
    router.push("/games")
  };

  const handleRankButtonClick = () => {
    setRankButtonPressed(true);
    router.push("/ranking")
  };

  const handlewishlistButtonClick=() =>{
    setWishlistButtonPressed(true);
    router.push("/wishlist")
  }
 

  const handleLoginButtonClick = () => {
    setLoginButtonPressed(true);
  };


  return (
    <nav className={styles.header}>
      <h4 className={styles.title}>Game Search App</h4>
      <form className={styles.SearchForm}>
        <input
          type="text"
          name="searchBar"
          className={styles.SearchInput}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className={`${styles.searchButton} ${searchButtonPressed ? styles.pressed : ""}`}
          onClick={handleSearchButtonClick}
        >
          <Image
            src="/assets/search.png"
            width={12}
            height={12}
            alt="Search Icon"
          />
        </button>
      </form>
      <button
        className={`${styles.searchBarButton} ${gameButtonPressed ? styles.pressed : ""}`}
        id={styles.gameIcon}
        onClick={handleGameButtonClick}
      >
        <Image
          src="/assets/console.png"
          width={60}
          height={60}
          alt="game Icon"
        />
      </button>
      <button
        className={`${styles.searchBarButton} ${rankButtonPressed ? styles.pressed : ""}`}
        id={styles.rankIcon}
        onClick={handleRankButtonClick}
      >
        <Image
          src="/assets/ranking.png"
          width={60}
          height={60}
          alt="ranking Icon"
        />
      </button>
      <button
        className={`${styles.searchBarButton} ${wishlistButtonPressed ? styles.pressed : ""}`}
        id={styles.whislistIcon}
        onClick={handlewishlistButtonClick}
      >
        <Image
          src="/assets/wishlist.png"
          width={60}
          height={60}
          alt="wishlist Icon"
        />
      </button>
           <button
        className={`${styles.searchBarButton} ${loginButtonPressed ? styles.pressed : ""}`}
        id={styles.loginIcon}
        onClick={handleLoginButtonClick}
      >
        <Image
          src="/assets/LoginIcon.png"
          width={60}
          height={60}
          alt="login Icon"
        />
      </button>
    </nav>
  );
}

