import React, { useState } from "react";

const Review= ({ filled, onClick }) => {
  return (
    <img
      src={filled ? "/assets/star-full.png" : "/assets/star-empty.png"}
      alt="Star"
      width={25}
      height={25}
      onClick={onClick}
    />
  );
};

export default Review;