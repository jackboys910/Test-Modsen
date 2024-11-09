import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BurgerMenu from '@components/BurgerMenu';
import StarRating from '@components/StarRating';
import {
  BodyWrapper,
  RecipeWrapper,
  InfoWrapper,
  ImageWrapper,
  MealSection,
  TypeSection,
  TypeSectionPart,
  StarRatingWrapper,
  IngredientsSection,
  IngredientsTitle,
  ProductsTitle,
  ProductsSection,
  MarksWrapper,
  RecipeTitle,
  Data,
  LinkWrapper,
  StyledLink,
  StyledMarkButton,
  StyledUsersMessage,
  StyledUserImage,
  StyledNickname,
  UsersList,
  UserListItem,
} from './index.styled';
import { ReactComponent as LightningIcon } from '@assets/icons/lightning.svg';
import { ReactComponent as MedalIcon } from '@assets/icons/medal.svg';
import { ReactComponent as EllipseIcon } from '@assets/icons/ellipse.svg';
import { ReactComponent as EllipseSmallIcon } from '@assets/icons/ellipseSmall.svg';
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
  uri: string;
}

interface IUser {
  nickname: string;
  profilePicture: string;
}

const RecipeDetailsPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [usersWhoTried, setUsersWhoTried] = useState<IUser[]>([]);
  const [hasTried, setHasTried] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [ratingCount, setRatingCount] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedRecipe = localStorage.getItem('selectedRecipe');
    if (storedRecipe) {
      const parsedRecipe: IRecipe = JSON.parse(storedRecipe);
      setRecipe(parsedRecipe);
    }
  }, []);

  useEffect(() => {
    if (!recipe) return;

    const fetchUsersWhoTried = async () => {
      try {
        const response = await fetch(`http://localhost:3001/usersWhoTriedRecipe/${encodeURIComponent(recipe.uri)}`);
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        const formattedData = data.map((user: any) => ({
          nickname: user.nickname,
          profilePicture: user.profile_picture || 'defaultUser.png',
        }));
        setUsersWhoTried(formattedData);
      } catch (error) {
        console.error('Error fetching users who tried:', error);
      }
    };

    const checkIfUserTried = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:3001/hasUserTriedRecipe/${encodeURIComponent(recipe.uri)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setHasTried(data.hasTried);
      } catch (error) {
        console.error('Error checking if user tried recipe:', error);
      }
    };

    const fetchUserRating = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch(`http://localhost:3001/getUserRating/${encodeURIComponent(recipe.uri)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserRating(data.rating);
      } catch (error) {
        console.error('Error fetching user rating:', error);
      }
    };

    const fetchRecipeRatingInfo = async () => {
      try {
        const response = await fetch(`http://localhost:3001/recipeRatingInfo/${encodeURIComponent(recipe.uri)}`);
        if (!response.ok) throw new Error('Failed to fetch recipe rating info');
        const data = await response.json();
        setAverageRating(data.averageRating);
        setRatingCount(data.ratingCount);
      } catch (error) {
        console.error('Error fetching recipe rating info:', error);
      }
    };

    fetchUsersWhoTried();
    checkIfUserTried();
    fetchUserRating();
    fetchRecipeRatingInfo();
  }, [recipe]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMarkAsTried = async () => {
    const token = localStorage.getItem('token');
    if (!token || !recipe) return;
    1;
    try {
      const response = await fetch(`http://localhost:3001/markAsTried/${encodeURIComponent(recipe.uri)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to mark as tried');

      setHasTried(true);
    } catch (error) {
      console.error('Error marking as tried:', error);
    }
  };

  const handleStarClick = async (rating: number) => {
    const token = localStorage.getItem('token');
    if (!token || !recipe) return;

    try {
      const response = await fetch(`http://localhost:3001/rateRecipe/${encodeURIComponent(recipe.uri)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) throw new Error('Failed to rate recipe');

      setUserRating(rating);
    } catch (error) {
      console.error('Error rating recipe:', error);
    }
  };

  const token = localStorage.getItem('token');

  if (!recipe) return null;

  const lastCuisineWord = recipe.cuisineType[0].split(' ')[recipe.cuisineType[0].split(' ').length - 1];

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  return (
    <div>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
      <BodyWrapper $ingredientsCount={recipe.ingredientLines.length}>
        <RecipeWrapper>
          {isMobile && (
            <ImageWrapper>
              <img src={recipe.image} alt={recipe.label} />
            </ImageWrapper>
          )}
          <InfoWrapper $ingredientsCount={recipe.ingredientLines.length}>
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
            <StarRatingWrapper>
              {token && <StarRating rating={userRating} onRate={handleStarClick} averageRating={averageRating} ratingCount={ratingCount} />}
            </StarRatingWrapper>
            <IngredientsSection>
              <IngredientsTitle>Ingredients</IngredientsTitle>
              <ul>
                {recipe.ingredientLines.slice(0, 5).map((ingredient: string, index: number) => (
                  <li key={index}>
                    <div>
                      {!isMobile ? <EllipseIcon /> : <EllipseSmallIcon />}
                      <span>{ingredient.length > 53 ? `${ingredient.slice(0, 53)}...` : ingredient}</span>
                    </div>
                    {isMobile && recipe.ingredients[index] && (
                      <img src={recipe.ingredients[index].image} alt={recipe.ingredients[index].text} />
                    )}
                  </li>
                ))}
              </ul>
            </IngredientsSection>
            {!isMobile && <ProductsTitle>Products</ProductsTitle>}
            <ProductsSection>
              {!isMobile &&
                recipe.ingredients
                  .slice(0, 3)
                  .map((ingredient: IIngredient, index: number) => <img key={index} src={ingredient.image} alt={ingredient.text} />)}
            </ProductsSection>
            {recipe && (
              <MarksWrapper $ingredientsCount={recipe.ingredientLines.length}>
                {token && (
                  <StyledMarkButton onClick={handleMarkAsTried} disabled={hasTried} $hasTried={hasTried}>
                    {hasTried ? `You've tried this!` : `Mark as Tried`}
                  </StyledMarkButton>
                )}
                <StyledUsersMessage>Users who tried this recipe:</StyledUsersMessage>
                <UsersList>
                  {usersWhoTried.map((user, index) => (
                    <UserListItem key={index}>
                      <Link to={`/${user.nickname}`}>
                        <StyledUserImage
                          src={`http://localhost:3001/assets/images/${user.profilePicture}`}
                          alt={user.nickname}
                          onError={(e) => {
                            e.currentTarget.src = 'http://localhost:3001/assets/images/defaultUser.png';
                          }}
                        />
                        <StyledNickname title={user.nickname}>{user.nickname}</StyledNickname>
                      </Link>
                    </UserListItem>
                  ))}
                </UsersList>
              </MarksWrapper>
            )}
            <LinkWrapper>
              <a href={recipe.url} target='_blank' rel='noopener noreferrer'>
                Recipe link
              </a>
            </LinkWrapper>
          </InfoWrapper>
          {!isMobile && (
            <ImageWrapper>
              <img src={recipe.image} alt={recipe.label} />
            </ImageWrapper>
          )}
        </RecipeWrapper>
      </BodyWrapper>
      <Footer />
    </div>
  );
};

export default RecipeDetailsPage;
