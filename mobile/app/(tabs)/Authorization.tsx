import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BurgerMenu from '../../components/BurgerMenu'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'
import { useNavigation, NavigationProp } from '@react-navigation/native'

type RootStackParamList = {
  index: () => void
  RecipeDetails: undefined
  Authorization: undefined
  Profile: undefined
  PublicProfile: undefined
  Messenger: undefined
  NotFound: undefined
}

const Authorization: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState(true)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const toggleAuthType = () => {
    setShowSignIn(!showSignIn)
  }

  return (
    <ScrollView style={styles.container}>
      <Header>
        <BurgerMenu />
      </Header>
      <View style={styles.bodyWrapper}>
        {showSignIn ? (
          <SignIn toggleAuthType={toggleAuthType} />
        ) : (
          <SignUp toggleAuthType={toggleAuthType} />
        )}
      </View>
      <Footer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 600,
    height: 800,
    backgroundColor: 'white',
    margin: 0,
  },
  linkText: {
    fontFamily: 'SpaceGroteskMedium',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 30,
    color: 'white',
    position: 'absolute',
    right: 0,
    top: '23%',
    textDecorationLine: 'none',
  },
})

export default Authorization
