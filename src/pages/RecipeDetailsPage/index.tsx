import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import {
  BodyWrapper,
  RecipeWrapper,
  InfoWrapper,
  ImageWrapper,
  MealSection,
  TypeSection,
  TypeSectionPart,
  IngredientsSection,
  IngredientsTitle,
  ProductsTitle,
  ProductsSection,
  RecipeTitle,
  Data,
  LinkWrapper,
  StyledLink,
} from './index.styled';
import { ReactComponent as LightningIcon } from '@assets/icons/lightning.svg';
import { ReactComponent as MedalIcon } from '@assets/icons/medal.svg';
import { ReactComponent as EllipseIcon } from '@assets/icons/ellipse.svg';
interface IIngredient {
  text: string;
  image: string;
}

interface IRecipe {
  mealType: string[];
  label: string;
  calories: number;
  cuisineType: string[];
  ingredientLines: string[];
  url: string;
  image: string;
  ingredients: IIngredient[];
}

const RecipeDetailsPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);

  useEffect(() => {
    const storedRecipe = localStorage.getItem('selectedRecipe');
    if (storedRecipe) {
      const parsedRecipe: IRecipe = JSON.parse(storedRecipe);
      setRecipe(parsedRecipe);
    }
  }, [recipeId]);

  if (!recipe) return null;

  const lastCuisineWord = recipe.cuisineType[0].split(' ')[recipe.cuisineType[0].split(' ').length - 1];

  return (
    <div>
      <Header>
        <StyledLink to='/'>Home</StyledLink>
      </Header>
      <BodyWrapper>
        <RecipeWrapper>
          <InfoWrapper>
            <MealSection>Meal type - {recipe.mealType[0]}</MealSection>
            <RecipeTitle>{recipe.label}</RecipeTitle>
            <TypeSection>
              <TypeSectionPart>
                <LightningIcon />
                <Data>{`${recipe.calories.toFixed(0)} Calories`}</Data>
              </TypeSectionPart>
              <TypeSectionPart>
                <MedalIcon />
                <Data>Cuisine Type - {lastCuisineWord.charAt(0).toUpperCase() + lastCuisineWord.slice(1)}</Data>
              </TypeSectionPart>
            </TypeSection>
            <IngredientsSection>
              <IngredientsTitle>Ingredients</IngredientsTitle>
              <ul>
                {recipe.ingredientLines.slice(0, 5).map((ingredient: string, index: number) => (
                  <li key={index}>
                    <EllipseIcon />
                    {ingredient.length > 58 ? `${ingredient.slice(0, 58)}...` : ingredient}
                  </li>
                ))}
              </ul>
            </IngredientsSection>
            <ProductsTitle>Products</ProductsTitle>
            <ProductsSection>
              {recipe.ingredients.slice(0, 3).map((ingredient: IIngredient, index: number) => (
                <img key={index} src={ingredient.image} alt={ingredient.text} />
              ))}
            </ProductsSection>
            <LinkWrapper>
              <a href={recipe.url} target='_blank' rel='noopener noreferrer'>
                Recipe link
              </a>
            </LinkWrapper>
          </InfoWrapper>
          <ImageWrapper>
            <img src={recipe.image} alt={recipe.label} />
          </ImageWrapper>
        </RecipeWrapper>
      </BodyWrapper>
      <Footer />
    </div>
  );
};

export default RecipeDetailsPage;
