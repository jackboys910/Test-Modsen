import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import FontAwesome from '@expo/vector-icons/FontAwesome'

interface StarRatingProps {
  rating: number | null
  onRate: (rating: number) => void
  averageRating: number | null
  ratingCount: number
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRate,
  averageRating,
  ratingCount,
}) => {
  return (
    <View>
      <View style={styles.starRatingWrapper}>
        <Text style={styles.styledRate}>Rate this recipe:</Text>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => onRate(star)}>
            {star <= (rating || 0) ? (
              <FontAwesome name="star" size={22} color="#FDBD84" />
            ) : (
              <Feather name="star" size={22} color="#FDBD84" />
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.styledAverageRating}>
        {ratingCount > 0
          ? `Average: ${averageRating} (${ratingCount} ${
              ratingCount === 1 ? 'rating' : 'ratings'
            })`
          : 'Average: no ratings yet'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  starRatingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  styledRate: {
    fontFamily: 'PoppinsRegular',
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    marginRight: 5,
  },
  styledAverageRating: {
    fontFamily: 'PoppinsRegular',
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    marginTop: 15,
  },
})

export default StarRating
