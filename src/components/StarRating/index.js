import React from "react";
import { Div } from "../Sections";

const StarRating = ({ rating = 0 }) => {
  const getRate = (index, rate) => {
    if (Math.round(rate) === index && rate % 1 !== 0) {
      return "middle";
    }
    if (index <= rate) {
      return "on";
    }
    return "off";
  };
  return (
    <Div
      display="flex"
      flexDirection="row"
      gap="8px"
      padding="10px 0 0 0"
      className="star-rating"
    >
      {[...Array(5)].map((_, index) => {
        index += 1;
        return (
          <Div key={index} className={getRate(index, rating)}>
            <span className="star">&#9733;</span>
          </Div>
        );
      })}
    </Div>
  );
};

export default StarRating;
