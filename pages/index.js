import { useRouter } from "next/router";
import styles from "./index.module.css";

export default function HomePage() {

  const router = useRouter();

  const handleClicktoAllGames = () => {
    router.push("/games")
  };
  
  const handleClicktoRanking = () => {
    router.push("/ranking")
  };

  const handleClicktoWishlist=() =>{
    router.push("/wishlist")
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.h1}>The Game Search App</h1>
   <button className={styles.button} onClick={handleClicktoAllGames}><h3>All Games in one Place</h3></button><br/>
   <p className={styles.p}>"With an extensive library covering all genres, our 'All Games in One Place' section is a gamer's paradise.<br/> From action-packed adventures to mind-bending puzzles, there's something for every gaming enthusiast."<br/>
"Explore a diverse selection of games, from indie gems to blockbuster titles. Your gaming journey begins here!"</p>
   <button className={styles.button}  onClick={handleClicktoRanking}><h3>Top 100 Games</h3></button><br/>
   <p  className={styles.p}>Check out the top 100 games that are making waves in the gaming world.<br/> See what's trending, and get ready for an exciting gaming experience.<br/>Stay updated with the gaming community's favorites and dive into the best gaming experiences."<br/>
"Discover the cream of the crop, where the excitement never ends. These are the games everyone is talking about."</p>
   <button className={styles.button}  onClick={handleClicktoWishlist}><h3>Wishlist your games here</h3></button><br/>
   <p  className={styles.p}>Create your personalized wishlist, a digital treasure trove of your dream games.<br/> 
   Don't let those must-play titles slip through the cracks. Add them to your wishlist and keep your gaming goals in sight."<br/>
"Wishlist your most coveted games with a simple click.<br/>
 Whether it's upcoming releases or classics you've been wanting to revisit, your gaming desires are just a wishlist away."</p>
    </div>
  );
}
