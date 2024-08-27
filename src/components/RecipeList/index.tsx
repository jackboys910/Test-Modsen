import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import RecipeItem from '@components/RecipeItem';
import Loader from '@components/Loader';
import { ListWrapper, LoadMoreButton, NoButtonWrapper } from './index.styled';
import { API_BASE_URL, API_ID, API_KEY } from '@constants/config';

interface IRecipe {
  recipe: {
    uri: string;
    image: string;
    label: string;
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

  const handleRecipeClick = (uri: string) => {
    const encodedUri = encodeURIComponent(uri);
    navigate(`/${encodedUri}`);
  };

  const handleRecipeItemClick = (uri: string) => {
    return () => {
      handleRecipeClick(uri);
    };
  };

  return (
    <>
      {loading && <Loader />}
      <ListWrapper>
        {recipes.length > 0
          ? recipes.map((recipe: IRecipe) => (
              <RecipeItem
                key={recipe.recipe.uri}
                image={recipe.recipe.image}
                label={recipe.recipe.label}
                onClick={handleRecipeItemClick(recipe.recipe.uri)}
              />
            ))
          : !loading && <p>No recipes found. Try a different search.</p>}
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
