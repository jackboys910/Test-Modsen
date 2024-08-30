import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import RecipeItem from '@components/RecipeItem';
import Loader from '@components/Loader';
import { ListWrapper, LoadMoreButton, NoButtonWrapper, NoRecipes } from './index.styled';
import { API_BASE_URL, API_ID, API_KEY } from '@constants/config';

interface IRecipe {
  recipe: {
    uri: string;
    image: string;
    label: string;
    ingredients: {
      text: string;
      image: string;
    }[];
    images?: {
      LARGE?: {
        url: string;
      };
    };
  };
}

interface IRecipeListProps {
  searchQuery: string;
  dietFilter: string;
  dishTypeFilter: string;
  triggerSearch: boolean;
}

const RecipeList: React.FC<IRecipeListProps> = ({ searchQuery, dietFilter, dishTypeFilter, triggerSearch }) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchRecipes = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.hits) {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.hits]);
        setNextUrl(data._links.next?.href || null);
      }
    } catch (error) {
      console.error('Error fetching recipes', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchRecipes = (nextUrl: string) => {
    return () => {
      fetchRecipes(nextUrl);
    };
  };

  useEffect(() => {
    const dietParam = dietFilter ? `&diet=${dietFilter.toLowerCase()}` : '';
    const dishTypeParam = dishTypeFilter ? `&dishType=${dishTypeFilter.toLowerCase()}` : '';
    const initialUrl = `${API_BASE_URL}?q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}&type=public&from=0&to=20${dietParam}${dishTypeParam}`;

    setRecipes([]);
    setNextUrl(null);
    if (searchQuery) fetchRecipes(initialUrl);
  }, [triggerSearch, searchQuery, dietFilter, dishTypeFilter]);

  const handleRecipeClick = (recipe: IRecipe, index: number) => {
    const imageUrl = recipe.recipe.images?.LARGE?.url || recipe.recipe.image;
    const updatedRecipe = { ...recipe.recipe, image: imageUrl };
    localStorage.setItem('selectedRecipe', JSON.stringify(updatedRecipe));
    navigate(`/recipe/${index}`, { state: { recipe: updatedRecipe } });
  };

  const handleRecipeItemClick = (recipe: IRecipe, index: number) => {
    return () => {
      handleRecipeClick(recipe, index);
    };
  };

  return (
    <>
      {loading && <Loader />}
      <ListWrapper>
        {recipes.length > 0
          ? recipes.map((recipe: IRecipe, index: number) => (
              <RecipeItem
                key={`${recipe.recipe.uri}-${index}`}
                image={recipe.recipe.image}
                label={recipe.recipe.label}
                onClick={handleRecipeItemClick(recipe, index)}
              />
            ))
          : !loading && <NoRecipes>No recipes found. Try a different search.</NoRecipes>}
      </ListWrapper>
      {recipes.length > 0 && nextUrl ? (
        <LoadMoreButton onClick={handleFetchRecipes(nextUrl)} disabled={loading}>
          Show more
        </LoadMoreButton>
      ) : (
        <NoButtonWrapper />
      )}
    </>
  );
};

export default RecipeList;
