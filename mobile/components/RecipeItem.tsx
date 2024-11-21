import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '../constants/styles/mainColors'

interface IRecipeItemProps {
  image: string
  label: string
  onClick: () => void
}

const RecipeItem: React.FC<IRecipeItemProps> = ({ image, label, onClick }) => {
  return (
    <TouchableOpacity style={styles.itemWrapper} onPress={onClick}>
      <Image source={{ uri: image }} style={styles.recipeImage} />
      <Text style={styles.recipeLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    width: 293,
    height: 420,
    borderWidth: 1,
    borderColor: COLORS.COLOR_BACKGROUND_GREY,
    borderRadius: 20,
    overflow: 'hidden',
    textAlign: 'center',
    backgroundColor: COLORS.COLOR_BACKGROUND_GREY,
    marginBottom: 25,
  },
  recipeImage: {
    width: '100%',
    height: 321,
    resizeMode: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  recipeLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 26.63,
    color: COLORS.COLOR_TITLE_VIOLET,
    paddingTop: 24,
    height: 52,
    overflow: 'hidden',
    textAlign: 'center',
  },
})

export default RecipeItem
