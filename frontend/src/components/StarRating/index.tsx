import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { StarRatingWrapper, StyledRate } from './index.styled';

interface StarRatingProps {
  rating: number | null;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <StarRatingWrapper>
      <StyledRate>Rate this recipe: </StyledRate>
      {/* {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => onRate(star)} style={{ cursor: 'pointer' }}>
          {star <= (rating || 0) ? <FaStar color='#FDBD84' size={22} /> : <FaRegStar color='#FDBD84' size={22} />}
        </span>
      ))} */}
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          style={{ cursor: 'pointer' }}
        >
          {star <= (hover || rating || 0) ? <FaStar color='#FDBD84' size={22} /> : <FaRegStar color='#FDBD84' size={22} />}
        </span>
      ))}
    </StarRatingWrapper>
  );
};

export default StarRating;
