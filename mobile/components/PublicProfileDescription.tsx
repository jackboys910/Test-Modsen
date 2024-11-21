import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

interface IPublicProfileDescriptionProps {
  description: string
  nickname: string
  cuisine: string
}

const PublicProfileDescription: React.FC<IPublicProfileDescriptionProps> = ({
  description,
  cuisine,
  nickname,
}) => {
  return (
    <View style={styles.profileDescriptionWrapper}>
      <Text style={styles.styledNickname}>{nickname}</Text>
      <View style={styles.infoWrapper}>
        <FontAwesome6
          name="bowl-food"
          size={24}
          color="grey"
          style={[styles.icon, { marginTop: 10 }]}
        />
        <Text style={styles.styledCuisine}>
          Favorite cuisine type - {cuisine || 'No information'}
        </Text>
      </View>
      <Text style={styles.styledAbout}>About user</Text>
      <Text style={styles.styledDescription}>
        {description || 'No information'}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileDescriptionWrapper: {
    width: '50%',
    paddingVertical: 0,
    paddingLeft: 10,
    paddingRight: 10,
  },
  styledNickname: {
    fontFamily: 'RobotoRegular',
    color: 'green',
    fontSize: 30,
    height: 50,
    marginBottom: 0,
    width: 350,
    position: 'absolute',
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: 'red',
    left: -80,
  },
  infoWrapper: {
    marginTop: 10,
    display: 'flex',
    gap: 5,
    position: 'relative',
    top: 200,
    width: 350,
    left: -94,
  },
  styledCuisine: {
    fontFamily: 'RobotoRegular',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 30,
  },
  styledAbout: {
    fontFamily: 'InterMedium',
    fontSize: 32,
    marginTop: 45,
    position: 'absolute',
    top: 260,
    left: -80,
  },
  icon: {
    position: 'absolute',
    top: 5,
  },
  styledDescription: {
    fontFamily: 'RobotoRegular',
    fontSize: 18,
    marginTop: 20,
    height: 300,
    textAlign: 'left',
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'purple',
    position: 'absolute',
    top: 360,
    width: 350,
    left: -80,
  },
})

export default PublicProfileDescription
