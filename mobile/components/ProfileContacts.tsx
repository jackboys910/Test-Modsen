import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

interface ProfileContactsProps {
  onUpdateProfile: (e: any) => void
  handleSignOut: () => void
  nickname: string
}

const ProfileContacts: React.FC<ProfileContactsProps> = ({
  onUpdateProfile,
  handleSignOut,
}) => {
  return (
    <View style={styles.profileContactsWrapper}>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <MaterialIcons name="exit-to-app" size={30} color="red" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.updateProfile} onPress={onUpdateProfile}>
        <Text style={{ textAlign: 'center', paddingTop: 3 }}>
          Update profile
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  profileContactsWrapper: {
    width: 350,
    height: 100,
    padding: 10,
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    top: 1150,
  },
  signOutButton: {
    position: 'absolute',
    right: '1%',
    bottom: '1%',
  },
  updateProfile: {
    height: 30,
    width: 120,
    borderRadius: 10,
    borderWidth: 1,
  },
})

export default ProfileContacts
