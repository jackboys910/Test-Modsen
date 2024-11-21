import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { SERVER_IP } from '../constants/config'
import Foundation from '@expo/vector-icons/Foundation'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Feather from '@expo/vector-icons/Feather'
import Octicons from '@expo/vector-icons/Octicons'

interface ProfileInfoProps {
  profilePicture: string
  phoneNumber: string
  location: string
  registeredAt: string
  lastOnline: string
  onChange: (field: string, value: any) => void
  onFileChange: (file: any) => void
  pictureErrorMessage: string | null
  errors: {
    phoneNumber: boolean
    location: boolean
  }
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profilePicture,
  phoneNumber,
  location,
  registeredAt,
  lastOnline,
  onChange,
  onFileChange,
  pictureErrorMessage,
  errors,
}) => {
  const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>({
    phoneNumber: false,
    location: false,
  })

  const handleFileClick = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      alert('Permission to access media library is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    })

    if (
      !pickerResult.canceled &&
      pickerResult.assets &&
      pickerResult.assets.length > 0
    ) {
      const uri = pickerResult.assets[0].uri
      console.log('Selected image URI:', uri)
      onFileChange({
        uri,
        name: uri.split('/').pop(),
        type: `image/${uri.split('.').pop()}`,
      })
    } else {
      console.log('Image picker canceled or no image selected.')
    }
  }

  const toggleTooltip = (field: string) => {
    setShowTooltip((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <View style={styles.profileInfoWrapper}>
      <TouchableOpacity style={styles.imageWrapper} onPress={handleFileClick}>
        <Image
          source={{
            uri: `${SERVER_IP}/assets/images/${profilePicture}`,
          }}
          style={styles.profileImage}
        />
        <View style={styles.cameraIcon}>
          <FontAwesome name="camera" size={24} color="grey" />
        </View>
      </TouchableOpacity>
      {pictureErrorMessage && (
        <Text style={styles.errorText}>{pictureErrorMessage}</Text>
      )}
      <View style={styles.aboutWrapper}>
        <View style={styles.dataWrapper}>
          <Foundation
            name="telephone"
            size={25}
            color="grey"
            style={styles.icon}
          />
          <TextInput
            style={[styles.infoInput, errors.phoneNumber && styles.errorBorder]}
            value={phoneNumber}
            onChangeText={(value) => onChange('phoneNumber', value)}
            placeholder="Phone number"
          />
          <TouchableOpacity
            style={styles.questionIcon}
            onPress={() => toggleTooltip('phoneNumber')}
          >
            <FontAwesome
              name="question-circle"
              size={20}
              style={{ color: errors.phoneNumber ? 'green' : 'grey' }}
            />
          </TouchableOpacity>
          {showTooltip.phoneNumber && (
            <Text style={styles.tooltip}>Only digits, max 15 characters</Text>
          )}
        </View>
        <View style={styles.dataWrapper}>
          <FontAwesome6
            name="location-dot"
            size={25}
            color="grey"
            style={styles.icon}
          />
          <TextInput
            style={[styles.infoInput, errors.location && styles.errorBorder]}
            value={location}
            onChangeText={(value) => onChange('location', value)}
            placeholder="Location"
          />
          <TouchableOpacity
            style={styles.questionIcon}
            onPress={() => toggleTooltip('location')}
          >
            <FontAwesome
              name="question-circle"
              size={20}
              style={{ color: errors.location ? 'green' : 'grey' }}
            />
          </TouchableOpacity>
          {showTooltip.location && (
            <Text style={styles.tooltip}>
              English letters, numbers, '.', ',', max 50 characters
            </Text>
          )}
        </View>
        <View style={[styles.dataWrapper, { marginLeft: -5 }]}>
          <Feather name="clock" size={20} color="grey" />
          <Text style={styles.timeText}>Registered since: {registeredAt}</Text>
        </View>
        <View style={styles.dataWrapper}>
          <Octicons
            name="dot-fill"
            size={20}
            color={lastOnline !== 'Online' ? 'grey' : 'green'}
          />
          <Text style={styles.timeText}>
            {lastOnline !== 'Online'
              ? 'Last online: ' + lastOnline
              : lastOnline}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileInfoWrapper: {
    width: 378,
    padding: 10,
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: 356,
    resizeMode: 'cover',
    padding: 8,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 5,
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    top: -10,
    left: 10,
  },
  aboutWrapper: {
    position: 'absolute',
    top: 450,
    left: 10,
  },
  dataWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  icon: {
    position: 'absolute',
    top: 8,
    left: -4,
  },
  infoInput: {
    fontFamily: 'RobotoRegular',
    width: 310,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    height: 45,
    marginLeft: 20,
  },
  questionIcon: {
    position: 'absolute',
    right: -20,
    top: 10,
  },
  errorBorder: {
    borderColor: 'red',
  },
  tooltip: {
    fontFamily: 'InterRegular',
    position: 'absolute',
    top: '80%',
    left: '77%',
    width: 120,
    height: 60,
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    color: 'black',
    fontSize: 12,
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  timeText: {
    fontFamily: 'InterRegular',
    fontSize: 15,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 0,
  },
})

export default ProfileInfo
