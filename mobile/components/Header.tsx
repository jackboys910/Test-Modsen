import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModsenIcon from '../assets/svg/modsen'
import { isAuthenticated } from '../utils/auth'
import { COLORS } from '../constants/styles/mainColors'

interface IHeaderProps {
  children?: React.ReactNode
}

type RootStackParamList = {
  index: undefined
  RecipeDetails: undefined
  Authorization: undefined
  Profile: undefined
  PublicProfile: undefined
  Messenger: { nickname: string | null }
  NotFound: undefined
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  const [loggedInUserNickname, setLoggedInUserNickname] = useState<
    string | null
  >(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useEffect(() => {
    const handleStorageChange = async () => {
      const nickname = await AsyncStorage.getItem('nickname')
      setLoggedInUserNickname(nickname)
    }

    handleStorageChange()
  }, [])

  useEffect(() => {
    const checkAuthStatus = async () => {
      const isAuthenticatedUser = await isAuthenticated()
      setIsUserAuthenticated(isAuthenticatedUser)
      setAuthChecked(true)
    }

    checkAuthStatus()
  }, [])

  if (!authChecked) {
    return null
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('index')}>
          <View style={styles.modsenWrapper}>
            <ModsenIcon />
            <Text style={styles.modsenTitle}>Recipe search</Text>
          </View>
        </TouchableOpacity>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.COLOR_MAIN_BLUE,
    width: '100%',
    height: 130,
    display: 'flex',
    paddingLeft: 25,
    zIndex: 1000,
  },
  headerContent: {
    width: '100%',
    maxWidth: 571,
    height: 95,
    marginTop: 35,
    position: 'relative',
    marginRight: 100,
  },
  modsenWrapper: {
    width: 250,
    height: 48,
    paddingTop: 23,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modsenTitle: {
    fontFamily: 'SpaceGroteskMedium',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 30.62,
    color: COLORS.COLOR_MODSEN_WHITE,
  },
  messengerWrapper: {
    width: 80,
  },
  userWrapper: {
    width: 100,
  },
})

export default Header
