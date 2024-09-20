import React from 'react';
import { ItemWrapper, RecipeImage, RecipeLabel } from './index.styled';

interface IRecipeItemProps {
  image: string;
  label: string;
  onClick: () => void;
}

const RecipeItem: React.FC<IRecipeItemProps> = ({ image, label, onClick }) => {
  return (
    <ItemWrapper onClick={onClick}>
      <RecipeImage src={image} alt={label} />
      <RecipeLabel>{label}</RecipeLabel>
    </ItemWrapper>
  );
};

export default RecipeItem;
