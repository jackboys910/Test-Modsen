import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { SERVER_IP } from '../../constants/config'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PublicProfileInfo from '../../components/PublicProfileInfo'
import PublicProfileDescription from '../../components/PublicProfileDescription'
import PublicProfileContacts from '../../components/PublicProfileContacts'
import BurgerMenu from '../../components/BurgerMenu'

const PublicProfile: React.FC = () => {
  const route = useRoute()
  const { nickname } = route.params as { nickname: string }
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${SERVER_IP}/getProfileByNickname/${nickname}`
        )
        if (!response.ok) throw new Error('Failed to fetch profile')
        const data = await response.json()
        setProfile({
          profilePicture: data.profile_picture || 'defaultUser.png',
          description: data.description || '',
          phoneNumber: data.phone_number || '',
          location: data.location || '',
          registeredAt: new Date(data.registered_at).toLocaleDateString(),
          lastOnline: data.last_online,
          nickname: data.nickname || '',
          cuisine: data.cuisine || '',
        })
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    fetchProfile()
  }, [nickname])

  return (
    <ScrollView>
      <Header>
        <BurgerMenu />
      </Header>
      <View style={styles.bodyWrapper}>
        <View style={styles.profileWrapper}>
          <View style={styles.infoWrapper}>
            <PublicProfileInfo
              profilePicture={profile.profilePicture}
              phoneNumber={profile.phoneNumber}
              location={profile.location}
              registeredAt={profile.registeredAt}
              lastOnline={profile.lastOnline}
            />
            <PublicProfileDescription
              description={profile.description}
              nickname={profile.nickname}
              cuisine={profile.cuisine}
            />
            <PublicProfileContacts nickname={profile.nickname} />
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
    alignItems: 'center',
  },
})

export default PublicProfile
