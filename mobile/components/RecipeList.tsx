import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RecipeItem from './RecipeItem'
import { API_BASE_URL, API_ID, API_KEY } from '../constants/config'
import { COLORS } from '../constants/styles/mainColors'

interface IRecipe {
  recipe: {
    uri: string
    image: string
    label: string
    ingredients: {
      text: string
      image: string
    }[]
    images?: {
      LARGE?: {
        url: string
      }
    }
  }
}

interface IRecipeListProps {
  searchQuery: string
  dietFilter: string
  dishTypeFilter: string
  triggerSearch: boolean
}

type RootStackParamList = {
  RecipeDetails: { recipeId: string }
  NotFound: undefined
}

const RecipeList: React.FC<IRecipeListProps> = ({
  searchQuery,
  dietFilter,
  dishTypeFilter,
  triggerSearch,
}) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([])
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const fetchRecipes = async (url: string) => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()

      if (data.hits) {
        setRecipes((prevRecipes) => [...prevRecipes, ...data.hits])
        setNextUrl(data._links.next?.href || null)
      }
    } catch (error) {
      console.error('Error fetching recipes', error)
    } finally {
      setLoading(false)
    }
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const clearStorage = async () => {
  //       await AsyncStorage.removeItem('selectedRecipe')
  //     }
  //     clearStorage()
  //   }, [])
  // )

  useEffect(() => {
    const dietParam = dietFilter ? `&diet=${dietFilter.toLowerCase()}` : ''
    const dishTypeParam = dishTypeFilter
      ? `&dishType=${dishTypeFilter.toLowerCase()}`
      : ''
    const initialUrl = `${API_BASE_URL}?q=${searchQuery}&app_id=${API_ID}&app_key=${API_KEY}&type=public&from=0&to=20${dietParam}${dishTypeParam}`

    setRecipes([])
    setNextUrl(null)
    if (searchQuery) fetchRecipes(initialUrl)
  }, [triggerSearch, searchQuery, dietFilter, dishTypeFilter])

  const handleRecipeClick = async (recipe: IRecipe, index: number) => {
    const imageUrl = recipe.recipe.images?.LARGE?.url || recipe.recipe.image
    const updatedRecipe = { ...recipe.recipe, image: imageUrl }
    await AsyncStorage.setItem('selectedRecipe', JSON.stringify(updatedRecipe))
    // Navigate to the recipe detail screen, assuming you have a navigation setup
    navigation.navigate('RecipeDetails', { recipeId: recipe.recipe.uri })
  }

  return (
    <>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#454745"
          style={{ marginTop: 30 }}
        />
      )}
      <ScrollView contentContainerStyle={styles.listWrapper}>
        {recipes.length > 0
          ? recipes.map((recipe: IRecipe, index: number) => (
              <RecipeItem
                key={`${recipe.recipe.uri}-${index}`}
                image={recipe.recipe.image}
                label={recipe.recipe.label}
                onClick={() => handleRecipeClick(recipe, index)}
              />
            ))
          : !loading && (
              <Text style={styles.noRecipes}>
                No recipes found. Try a different search.
              </Text>
            )}
      </ScrollView>
      {recipes.length > 0 && nextUrl && !loading && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={() => fetchRecipes(nextUrl)}
        >
          <Text style={styles.loadMoreButtonText}>Show more</Text>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  listWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
    marginTop: 32,
    marginBottom: 20,
  },
  loadMoreButton: {
    marginBottom: 108,
    alignSelf: 'center',
    backgroundColor: COLORS.COLOR_BUTTON_BACKGROUND_BLUE,
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 250,
    height: 50,
    shadowColor: COLORS.COLOR_BACKBUTTON_SHADOW_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 0,
  },
  loadMoreButtonText: {
    color: COLORS.COLOR_BUTTON_TEXT_WHITE,
    fontSize: 16,
    fontFamily: 'RobotoRegular',
    fontWeight: 400,
    lineHeight: 20,
    letterSpacing: 0.01,
    textAlign: 'center',
  },
  noRecipes: {
    fontSize: 30,
    textAlign: 'center',
  },
})

export default RecipeList
