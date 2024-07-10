import React from "react";
import rev from "/images/user.png";
import "../styles/review.css";

// Make sure Font Awesome is included in your project


function Reviews(props) {
  const totalStars = 5;

  return (
    <div>
      <div className="main-review">
        <div className="name">
          <img src={rev} alt="review" />
          <p>{props.name}</p>
        </div>

        <div className="rating">
          {[...Array(totalStars)].map((star, index) => {
            const starClass = index < props.rating ? "fa fa-star checked" : "fa fa-star";
            return <span key={index} className={starClass}></span>;
          })}
        </div>

        <div className="pr">
          <p>{props.review}</p>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
