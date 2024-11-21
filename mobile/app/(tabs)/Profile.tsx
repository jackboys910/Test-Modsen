import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  ScrollView,
  Text,
  Button,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native'
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native'
import { SERVER_IP } from '../../constants/config'
import AsyncStorage from '@react-native-async-storage/async-storage'
import calculateRelativeTime from '../../utils/calculateOnline'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import BurgerMenu from '../../components/BurgerMenu'
import ProfileInfo from '../../components/ProfileInfo'
import ProfileDescription from '../../components/ProfileDescription'
import ProfileContacts from '../../components/ProfileContacts'

type RootStackParamList = {
  Authorization: undefined
  NotFound: undefined
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState({
    profilePicture: 'defaultUser.png',
    description: '',
    phoneNumber: '',
    location: '',
    registeredAt: '',
    lastOnline: '',
    nickname: '',
    cuisine: '',
  })
  const [newProfilePicture, setNewProfilePicture] = useState<any | null>(null)
  const [pictureErrorMessage, setPictureErrorMessage] = useState<string | null>(
    null
  )
  const [errors, setErrors] = useState({
    phoneNumber: false,
    location: false,
    cuisine: false,
    description: false,
  })
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const token = await AsyncStorage.getItem('token')
          if (!token) throw new Error('No token found')

          const response = await fetch(`${SERVER_IP}/getProfile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })

          if (!response.ok) throw new Error('Failed to fetch profile')

          const data = await response.json()
          setProfile({
            profilePicture: data.profile_picture || 'defaultUser.png',
            description: data.description || '',
            phoneNumber: data.phone_number || '',
            location: data.location || '',
            registeredAt: new Date(data.registered_at).toLocaleDateString(),
            lastOnline: calculateRelativeTime(data.last_online),
            nickname: data.nickname || '',
            cuisine: data.cuisine || '',
          })
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      }

      fetchProfile()
    }, [])
  )

  const handleSignOut = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('nickname')
    await AsyncStorage.removeItem('userId')
    navigation.navigate('Authorization')
  }

  const validateInputs = () => {
    const phoneNumberValid =
      profile.phoneNumber === '' || /^[\d+]{1,15}$/.test(profile.phoneNumber)
    const locationValid =
      profile.location === '' || /^[a-zA-Z0-9., ]{0,50}$/.test(profile.location)
    const cuisineValid =
      profile.cuisine === '' || /^[a-zA-Z, ]{0,35}$/.test(profile.cuisine)
    const descriptionValid = profile.description.length <= 520

    setErrors({
      phoneNumber: !phoneNumberValid,
      location: !locationValid,
      cuisine: !cuisineValid,
      description: !descriptionValid,
    })

    return phoneNumberValid && locationValid && cuisineValid && descriptionValid
  }

  const handleProfileUpdate = async () => {
    if (!validateInputs()) return

    try {
      const token = await AsyncStorage.getItem('token')
      const formData = new FormData()
      Object.entries(profile).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      if (newProfilePicture) {
        const file = {
          uri: newProfilePicture.uri,
          name: newProfilePicture.name,
          type: newProfilePicture.type,
        }

        formData.append('profilePicture', file as any)
      }

      const response = await fetch(`${SERVER_IP}/updateProfile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })
      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile({
          profilePicture: updatedProfile.profile_picture || 'defaultUser.png',
          description: updatedProfile.description || '',
          phoneNumber: updatedProfile.phone_number || '',
          location: updatedProfile.location || '',
          registeredAt: new Date(
            updatedProfile.registered_at
          ).toLocaleDateString(),
          lastOnline: calculateRelativeTime(updatedProfile.last_online),
          nickname: updatedProfile.nickname || '',
          cuisine: updatedProfile.cuisine || '',
        })
        setNewProfilePicture(null)
        setPictureErrorMessage(null)
      } else {
        console.error('Error updating profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleChange = (field: string, value: string) => {
    setProfile((prevProfile) => ({ ...prevProfile, [field]: value }))
  }

  const handleFileChange = (file: {
    uri: string
    name: string
    type: string
  }) => {
    const validExtensions = ['jpeg', 'jpg', 'png', 'gif']

    if (file.uri) {
      const fileExtension = file.uri.split('.').pop()?.toLowerCase()
      if (!validExtensions.includes(fileExtension || '')) {
        setPictureErrorMessage('Supported file types are: jpeg, jpg, png, gif')
        return
      }
    }
    setNewProfilePicture(file)
    setPictureErrorMessage(null)
  }

  return (
    <ScrollView>
      <Header>
        <BurgerMenu />
      </Header>
      <View style={styles.bodyWrapper}>
        <View style={styles.profileWrapper}>
          <View style={styles.infoWrapper}>
            <ProfileInfo
              profilePicture={profile.profilePicture}
              phoneNumber={profile.phoneNumber}
              location={profile.location}
              registeredAt={profile.registeredAt}
              lastOnline={profile.lastOnline}
              onChange={handleChange}
              onFileChange={handleFileChange}
              pictureErrorMessage={pictureErrorMessage}
              errors={errors}
            />
            <ProfileDescription
              description={profile.description}
              nickname={profile.nickname}
              cuisine={profile.cuisine}
              onChange={handleChange}
              errors={errors}
            />
            <ProfileContacts
              handleSignOut={handleSignOut}
              onUpdateProfile={handleProfileUpdate}
              nickname={profile.nickname}
            />
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: 1500,
    margin: 0,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  profileWrapper: {
    height: 1000,
    display: 'flex',
    justifyContent: 'center',
    borderWidth: 0,
    marginTop: 100,
  },
  infoWrapper: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: 5,
  },
})

export default Profile
