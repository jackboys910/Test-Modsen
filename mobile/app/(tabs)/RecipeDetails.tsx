import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  useRoute,
  useFocusEffect,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native'
import { SERVER_IP } from '../../constants/config'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BurgerMenu from '../../components/BurgerMenu'
import StarRating from '../../components/StarRating'
import LightningIcon from '../../assets/svg/lightning'
import MedalIcon from '../../assets/svg/medal'
import EllipseSmallIcon from '../../assets/svg/ellipseSmall'
import { COLORS } from '../../constants/styles/mainColors'

interface IIngredient {
  text: string
  image: string
}

interface IRecipe {
  mealType: string[]
  label: string
  calories: number
  cuisineType: string[]
  ingredientLines: string[]
  url: string
  image: string
  ingredients: IIngredient[]
  uri: string
}

interface IUser {
  nickname: string
  profilePicture: string
}

type RootStackParamList = {
  PublicProfile: { nickname: string }
  NotFound: undefined
}

const RecipeDetails: React.FC = () => {
  const route = useRoute()
  const { recipeId } = route.params as { recipeId: string }
  const [recipe, setRecipe] = useState<IRecipe | null>(null)
  const [usersWhoTried, setUsersWhoTried] = useState<IUser[]>([])
  const [hasTried, setHasTried] = useState(false)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [ratingCount, setRatingCount] = useState<number>(0)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useFocusEffect(
    useCallback(() => {
      const fetchRecipe = async () => {
        const storedRecipe = await AsyncStorage.getItem('selectedRecipe')
        if (storedRecipe) {
          const parsedRecipe: IRecipe = JSON.parse(storedRecipe)
          setRecipe(parsedRecipe)
        }
      }

      fetchRecipe()
    }, [])
  )

  useEffect(() => {
    if (!recipe) return

    const fetchUsersWhoTried = async () => {
      try {
        const response = await fetch(
          `${SERVER_IP}/usersWhoTriedRecipe/${encodeURIComponent(recipe.uri)}`
        )
        if (!response.ok) throw new Error('Failed to fetch users')
        const data = await response.json()
        const formattedData = data.map((user: any) => ({
          nickname: user.nickname,
          profilePicture:
            `${SERVER_IP}/assets/images/${user.profile_picture}` ||
            'defaultUser.png',
        }))
        setUsersWhoTried(formattedData)
      } catch (error) {
        console.error('Error fetching users who tried:', error)
      }
    }

    const checkIfUserTried = async () => {
      const token = await AsyncStorage.getItem('token')
      if (!token) return

      try {
        const response = await fetch(
          `${SERVER_IP}/hasUserTriedRecipe/${encodeURIComponent(recipe.uri)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()
        setHasTried(data.hasTried)
      } catch (error) {
        console.error('Error checking if user tried recipe:', error)
      }
    }

    const fetchUserRating = async () => {
      const token = await AsyncStorage.getItem('token')
      if (!token) return

      try {
        const response = await fetch(
          `${SERVER_IP}/getUserRating/${encodeURIComponent(recipe.uri)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()
        setUserRating(data.rating)
      } catch (error) {
        console.error('Error fetching user rating:', error)
      }
    }

    const fetchRecipeRatingInfo = async () => {
      try {
        const response = await fetch(
          `${SERVER_IP}/recipeRatingInfo/${encodeURIComponent(recipe.uri)}`
        )
        if (!response.ok) throw new Error('Failed to fetch recipe rating info')
        const data = await response.json()
        setAverageRating(data.averageRating)
        setRatingCount(data.ratingCount)
      } catch (error) {
        console.error('Error fetching recipe rating info:', error)
      }
    }

    fetchUsersWhoTried()
    checkIfUserTried()
    fetchUserRating()
    fetchRecipeRatingInfo()
  }, [recipe])

  const handleMarkAsTried = async () => {
    const token = await AsyncStorage.getItem('token')
    if (!token || !recipe) return

    try {
      const response = await fetch(
        `${SERVER_IP}/markAsTried/${encodeURIComponent(recipe.uri)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) throw new Error('Failed to mark as tried')

      setHasTried(true)
    } catch (error) {
      console.error('Error marking as tried:', error)
    }
  }

  const handleStarClick = async (rating: number) => {
    const token = await AsyncStorage.getItem('token')
    if (!token || !recipe) return

    try {
      const response = await fetch(
        `${SERVER_IP}/rateRecipe/${encodeURIComponent(recipe.uri)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating }),
        }
      )

      if (!response.ok) throw new Error('Failed to rate recipe')

      setUserRating(rating)
    } catch (error) {
      console.error('Error rating recipe:', error)
    }
  }

  const navigateToProfile = (nickname: string) => {
    navigation.navigate('PublicProfile', { nickname })
  }

  if (!recipe) return null

  const lastCuisineWord = recipe.cuisineType[0]?.split(' ').pop() || ''
  const marksTop = calculateHeight(recipe.ingredientLines.length, 850)
  const infoHeight = calculateHeight(recipe.ingredientLines.length, 2000)
  const bodyHeight = calculateHeight(recipe.ingredientLines.length, 2650)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header>
        <BurgerMenu />
      </Header>
      <View style={[styles.bodyWrapper, { height: bodyHeight }]}>
        <View style={styles.recipeWrapper}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
          </View>
          <View style={[styles.infoWrapper, { height: infoHeight }]}>
            <Text style={styles.mealSection}>
              Meal type - {recipe.mealType[0]}
            </Text>
            <Text style={styles.recipeTitle} numberOfLines={2}>
              {recipe.label}
            </Text>
            <View style={styles.typeSection}>
              <View style={styles.typeSectionPart}>
                <LightningIcon style={{ marginRight: 15 }} />
                <Text style={styles.data}>{`${recipe.calories.toFixed(
                  0
                )} Calories`}</Text>
              </View>
              <View style={styles.typeSectionPart}>
                <MedalIcon style={{ marginRight: 15 }} />
                <Text style={styles.data}>
                  Cuisine Type -{' '}
                  {lastCuisineWord?.charAt(0).toUpperCase() +
                    lastCuisineWord?.slice(1)}
                </Text>
              </View>
            </View>
            <View style={styles.starRatingWrapper}>
              <StarRating
                rating={userRating}
                onRate={handleStarClick}
                averageRating={averageRating}
                ratingCount={ratingCount}
              />
            </View>
            <View style={styles.ingredientsSection}>
              <Text style={styles.ingredientsTitle}>Ingredients</Text>
              {recipe.ingredientLines
                .slice(0, 5)
                .map((ingredient: string, index: number) => (
                  <View key={index} style={styles.ingredientItem}>
                    <EllipseSmallIcon
                      style={{
                        position: 'relative',
                        bottom: 10,
                        marginRight: 15,
                      }}
                    />
                    <Text style={styles.ingredientText}>
                      {ingredient.length > 90
                        ? `${ingredient.slice(0, 90)}...`
                        : ingredient}
                    </Text>
                    {recipe.ingredients[index] && (
                      <Image
                        source={{ uri: recipe.ingredients[index].image }}
                        style={styles.ingredientImage}
                      />
                    )}
                  </View>
                ))}
            </View>
            {/* <View style={styles.productsSection}>
              <Text style={styles.productsTitle}>Products</Text>
              {recipe.ingredients
                .slice(0, 3)
                .map((ingredient: IIngredient, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: ingredient.image }}
                    style={styles.productImage}
                  />
                ))}
            </View> */}
            <View style={[styles.marksWrapper, { top: marksTop }]}>
              <TouchableOpacity
                onPress={handleMarkAsTried}
                disabled={hasTried}
                style={[
                  styles.markButton,
                  {
                    backgroundColor: hasTried
                      ? 'grey'
                      : COLORS.COLOR_MARK_BUTTON_GREEN,
                  },
                ]}
              >
                <Text style={styles.markButtonText}>
                  {hasTried ? `You've tried this!` : `Mark as Tried`}
                </Text>
              </TouchableOpacity>
              <Text style={styles.usersMessage}>
                Users who tried this recipe:
              </Text>
              <View style={styles.usersList}>
                {usersWhoTried.map((user: IUser, index: number) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.userListItem}
                    onPress={() => navigateToProfile(user.nickname)}
                  >
                    <Image
                      source={{
                        uri:
                          user.profilePicture === 'defaultUser.png'
                            ? `${SERVER_IP}/assets/images/defaultUser.png`
                            : user.profilePicture,
                      }}
                      style={styles.userImage}
                    />
                    <Text style={styles.nickname}>{user.nickname}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <TouchableOpacity
              style={styles.linkWrapper}
              onPress={() => Linking.openURL(recipe.url)}
            >
              <Text style={styles.recipeLink}>Recipe link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  )
}

function calculateHeight(ingredientsCount: number, baseHeight: number): number {
  const reductionPerIngredient = 220
  const maxVisibleIngredients = 5
  const visibleIngredients = Math.min(ingredientsCount, maxVisibleIngredients)
  return (
    baseHeight -
    reductionPerIngredient * (maxVisibleIngredients - visibleIngredients)
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.COLOR_BACKGROUND_GREY,
  },
  bodyWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  recipeWrapper: {
    width: '90%',
  },
  imageWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 190,
  },
  recipeImage: {
    height: 318,
    width: 311,
    maxWidth: '100%',
  },
  infoWrapper: {
    padding: 20,
    backgroundColor: COLORS.COLOR_MAIN_BLUE,
    borderRadius: 28,
    marginTop: 20,
    width: '100%',
    flexShrink: 0,
    position: 'relative',
  },
  mealSection: {
    fontFamily: 'PoppinsMedium',
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 2.21,
    height: 20,
    color: COLORS.COLOR_TYPE_BEIGE,
    fontWeight: 500,
    marginBottom: 10,
  },
  recipeTitle: {
    fontFamily: 'PlayfairDisplayMedium',
    fontSize: 30,
    fontWeight: 500,
    lineHeight: 45,
    color: 'white',
    height: 99,
    marginBottom: 10,
    marginTop: -5,
    overflow: 'hidden',
  },
  typeSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 24,
    width: 250,
    marginBottom: 20,
    flexDirection: 'column',
  },
  typeSectionPart: {
    display: 'flex',
    height: 24,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  data: {
    fontFamily: 'PoppinsRegular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    height: 24,
    margin: 0,
  },
  starRatingWrapper: {
    marginTop: 40,
    position: 'relative',
    top: 50,
  },
  ingredientsSection: {
    marginTop: 90,
    marginBottom: 20,
    width: '100%',
    height: 250,
  },
  ingredientsTitle: {
    fontFamily: 'PlayfairDisplayBold',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 32,
    width: 140,
    height: 30,
    color: 'white',
    marginBottom: 30,
  },
  ingredientItem: {
    fontFamily: 'PoppinsMedium',
    fontWeight: 500,
    fontSize: 12,
    lineHeight: 18,
    height: 210,
    color: COLORS.COLOR_INGREDIENTS_GREY,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
    position: 'relative',
  },
  ingredientText: {
    color: COLORS.COLOR_INGREDIENTS_GREY,
    position: 'absolute',
    left: 20,
    top: -15,
  },
  ingredientImage: {
    width: 163,
    height: 163,
    borderRadius: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  // productsSection: {
  //   marginTop: 20,
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  // productsTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   color: 'white',
  //   marginBottom: 10,
  // },
  // productImage: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 10,
  //   marginRight: 10,
  //   marginBottom: 10,
  // },
  marksWrapper: {
    position: 'relative',
  },
  markButton: {
    paddingVertical: 10,
    paddingTop: 7,
    marginTop: 50,
    borderRadius: 5,
    width: 125,
    height: 35,
    alignItems: 'center',
  },
  // markButtonDisabled: {
  //   backgroundColor: 'grey',
  // },
  markButtonText: {
    color: 'white',
  },
  usersMessage: {
    fontFamily: 'SpaceGroteskMedium',
    fontWeight: 400,
    fontSize: 20,
    color: 'white',
    marginVertical: 20,
  },
  usersList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    margin: 0,
    flexWrap: 'wrap',
  },
  userListItem: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 50,
  },
  nickname: {
    fontFamily: 'SpaceGroteskMedium',
    fontWeight: 300,
    margin: 0,
    color: 'white',
    maxWidth: 100,
    overflow: 'hidden',
    // textAlign: 'center',
  },
  linkWrapper: {
    marginTop: 0,
    position: 'absolute',
    bottom: 15,
  },
  recipeLink: {
    fontFamily: 'PlayfairDisplayBold',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 32,
    color: 'white',
    width: 124,
    height: 32,
    textDecorationLine: 'none',
    marginLeft: 20,
  },
})

export default RecipeDetails
