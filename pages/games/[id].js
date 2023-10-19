import React from "react";
import { useRouter } from "next/router";

const GameDetails = () => {
  const router = useRouter();
  const { id, name, image, metascore } = router.query;
  return (
    <div>
      <h1> {name}</h1>
      <img
        src={image}
        alt={`Image for ${name}`}
        width={300}
        height={300}
      />
      <p>Metascore rating: {metascore}</p>
    </div>
  );
};

export default GameDetails;
