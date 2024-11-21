import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IPublicProfileContactsProps {
  nickname: string
}

type RootStackParamList = {
  Home: undefined
  RecipeDetails: undefined
  Authorization: undefined
  Profile: undefined
  PublicProfile: undefined
  Messenger: { receiverNickname: string; senderNickname: string | null }
  NotFound: undefined
}

const PublicProfileContacts: React.FC<IPublicProfileContactsProps> = ({
  nickname,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleSendMessageClick = async () => {
    const senderNickname = await AsyncStorage.getItem('nickname')

    navigation.navigate('Messenger', {
      receiverNickname: nickname,
      senderNickname,
    })
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.sendMessageButton}
        onPress={handleSendMessageClick}
      >
        <Text style={styles.sendMessageText}>Send Message</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 350,
    height: 100,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 1160,
    marginLeft: -10,
  },
  sendMessageButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    width: 240,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  sendMessageText: {
    color: 'white',
    fontSize: 16,
  },
})

export default PublicProfileContacts
