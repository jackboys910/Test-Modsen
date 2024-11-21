import React, { useState, useEffect } from 'react'
import { View, Text, Button, Dimensions, StyleSheet } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BurgerMenu from '../../components/BurgerMenu'
import { COLORS } from '../../constants/styles/mainColors'

type RootStackParamList = {
  index: undefined
}

const NotFound: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(Dimensions.get('window').width)
    }

    const subscription = Dimensions.addEventListener('change', handleResize)

    return () => {
      subscription?.remove()
    }
  }, [])

  const isMobile = windowWidth >= 390 && windowWidth <= 768

  return (
    <View style={styles.BodyWrapper}>
      <Header>{isMobile ? <BurgerMenu /> : <Text>Home</Text>}</Header>
      <View style={styles.NotFoundContainer}>
        <Text style={styles.ErrorCode}>404</Text>
        <Text style={styles.ErrorMessage}>OOOps! Page Not Found</Text>
        <Text style={styles.ErrorParagraph}>
          This page doesn't exist or was removed! We suggest you back to home
        </Text>
        <Button
          title="Back to homepage"
          onPress={() => navigation.navigate('index')}
          color={styles.BackButton.backgroundColor}
        />
      </View>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  BodyWrapper: {
    flex: 1,
    flexDirection: 'column',
    minHeight: '100%',
    margin: 0,
  },
  NotFoundContainer: {
    marginTop: '12.8%',
    marginLeft: '30.3%',
    width: '45%',
    height: 391,
    textAlign: 'center',
  },
  ErrorMessage: {
    fontFamily: 'InterLight',
    fontWeight: '300',
    fontSize: 46,
    lineHeight: 55.67,
    marginVertical: 20,
    textAlign: 'left',
    marginLeft: '11%',
  },
  ErrorParagraph: {
    marginVertical: 45,
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 21,
    lineHeight: 25.41,
    color: COLORS.COLOR_ERROR_PARAGRAPH_GREY,
    textAlign: 'left',
  },
  BackButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 16.94,
    color: 'white',
    borderRadius: 24,
    backgroundColor: COLORS.COLOR_BACKBUTTON_BACKGROUND_GREEN,
    shadowColor: COLORS.COLOR_BACKBUTTON_SHADOW_GREEN,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 16,
    textAlign: 'center',
    width: 238.4,
    height: 48,
    marginRight: '13%',
  },
  ErrorCode: {
    width: 280,
    height: 148,
    textAlign: 'left',
    marginHorizontal: 'auto',
    marginLeft: '12%',
    fontFamily: 'InterBold',
    fontWeight: '700',
    fontSize: 122,
    lineHeight: 147.65,
    color: COLORS.COLOR_ERROR_ORANGE,
  },
})

export default NotFound
