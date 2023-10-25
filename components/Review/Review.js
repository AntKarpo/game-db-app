
const Review = ({ filled, onStarClick}) => {
 

  return (
    <div style={{ display: "inline-block", marginRight: "5px" }}>
      <img
        src={filled ? "/assets/star-full.png" : "/assets/star-empty.png"}
        alt="Star"
        width={25}
        height={25}
        onClick={onStarClick}
      />
    </div>
  );
};


export default Review;