import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import MenuIcon from '../assets/svg/menu'
import { isAuthenticated } from '../utils/auth'
import { COLORS } from '../constants/styles/mainColors'
import useAsyncStorage from '../hooks/useAsyncStorage'

type RootStackParamList = {
  index: undefined
  Profile: undefined
  Messenger: undefined
}

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loggedInUserNickname, refreshNickname] = useAsyncStorage('nickname')
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const menuHeight = useState(new Animated.Value(0))[0]

  // useEffect(() => {
  //   const getNickname = async () => {
  //     const nickname = await AsyncStorage.getItem('nickname')
  //     setLoggedInUserNickname(nickname)
  //   }
  //   getNickname()
  // }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    Animated.timing(menuHeight, {
      toValue: isOpen ? 0 : 140,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const navigateTo = async (route: string) => {
    const authenticated = await isAuthenticated()
    toggleMenu()
    if (route === 'Profile' && !authenticated) {
      navigation.navigate('Authorization' as never)
    } else if (route.startsWith('Messenger')) {
      const nickname = await AsyncStorage.getItem('nickname')
      navigation.navigate('Messenger', { nickname } as never)
    } else {
      navigation.navigate(route as never)
    }
    refreshNickname()
  }

  return (
    <View style={styles.menuWrapper}>
      <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
        <MenuIcon />
      </TouchableOpacity>
      <Animated.View style={[styles.menu, { height: menuHeight }]}>
        <TouchableOpacity onPress={() => navigateTo('index')}>
          <Text style={styles.menuItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateTo('Profile')}>
          <Text style={styles.menuItem}>Profile</Text>
        </TouchableOpacity>
        {loggedInUserNickname && (
          <TouchableOpacity
            onPress={() => navigateTo(`Messenger/${loggedInUserNickname}`)}
          >
            <Text style={styles.menuItem}>Messenger</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  menuWrapper: {
    position: 'absolute',
    bottom: 20,
    right: 75,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  menuIcon: {
    position: 'absolute',
    right: -45,
    top: 40,
  },
  menu: {
    position: 'absolute',
    top: 125,
    right: -70,
    backgroundColor: COLORS.COLOR_MAIN_BLUE,
    width: 100,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    color: 'white',
    paddingLeft: 18,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 16,
  },
})

export default BurgerMenu
