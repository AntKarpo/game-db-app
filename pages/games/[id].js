import React from "react";
import { useRouter } from "next/router";
import styles from "./id.module.css"

const GameDetails = () => {
  const router = useRouter();
  const { id, name, image, metascore, screenshots } = router.query;
  
  console.log(screenshots, "screenshots");
  console.log(name,"name");
const screenshotss = JSON.parse(screenshots);

  return (
    <div className={styles.detailsCard}>
      <h1>{name}</h1>
      <img src={image} alt={`Image for ${name}`} width={300} height={300} />
      <p>Metascore rating: {metascore}</p><br/>
      <div className={styles.screenshotsContainer}>
        {console.log(screenshots, "inline screenshot")}
        {screenshotss?.map((screenshot, index) => (
            <img
              key={index}
              src={screenshot}
              alt={`Screenshot for ${name}`}
              width={150}
              height={120}
              />
              ))}
      </div>
    </div>
  );
};

export default GameDetails;
