import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

interface ProfileDescriptionProps {
  description: string
  nickname: string
  cuisine: string
  onChange: (field: string, value: string) => void
  errors: {
    cuisine: boolean
    description: boolean
  }
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({
  description,
  nickname,
  cuisine,
  onChange,
  errors,
}) => {
  const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>({
    cuisine: false,
  })

  const toggleTooltip = (field: string) => {
    setShowTooltip((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <View style={styles.profileDescriptionWrapper}>
      <Text style={styles.nickname}>{nickname}</Text>
      <View style={styles.infoWrapper}>
        <FontAwesome6
          name="bowl-food"
          size={24}
          color="grey"
          style={{ marginTop: 10 }}
        />
        <Text style={styles.cuisine}>Favorite cuisine type - </Text>
        <TextInput
          style={[styles.infoInput, errors.cuisine && styles.errorBorder]}
          value={cuisine}
          onChangeText={(value) => onChange('cuisine', value)}
          placeholder="Your favorite cuisine type"
        />
        <TouchableOpacity onPress={() => toggleTooltip('cuisine')}>
          <FontAwesome
            name="question-circle"
            size={20}
            style={[
              styles.questionIcon,
              { color: errors.cuisine ? 'green' : 'grey' },
            ]}
          />
        </TouchableOpacity>
        {showTooltip.cuisine && (
          <Text style={styles.tooltip}>
            English letters, ',', '.', max 35 characters
          </Text>
        )}
      </View>
      <Text style={styles.about}>About you</Text>
      <TextInput
        style={[
          styles.description,
          (errors.description || description.length > 520) &&
            styles.errorBorder,
        ]}
        value={description}
        onChangeText={(value) => onChange('description', value)}
        placeholder="Here you can tell about you"
        multiline
      />
      <Text
        style={[styles.charCount, description.length > 520 && styles.errorText]}
      >
        {description.length}/520
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileDescriptionWrapper: {
    width: '50%',
    paddingTop: 0,
    paddingRight: 10,
    paddingBottom: 0,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  nickname: {
    fontFamily: 'RobotoRegular',
    color: 'green',
    fontSize: 30,
    height: 50,
    margin: 0,
    width: 350,
    position: 'absolute',
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: 'red',
  },
  infoWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
    marginLeft: -5,
    top: 250,
    width: 350,
  },
  cuisine: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    marginTop: 10,
  },
  infoInput: {
    fontFamily: 'RobotoRegular',
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    height: 45,
    width: 170,
  },
  questionIcon: {
    position: 'absolute',
    right: -15,
    top: 13,
  },
  about: {
    fontFamily: 'InterMedium',
    fontSize: 32,
    marginTop: 45,
    position: 'absolute',
    top: 300,
  },
  description: {
    fontFamily: 'RobotoRegular',
    fontSize: 18,
    marginTop: 10,
    height: 250,
    textAlignVertical: 'top',
    position: 'absolute',
    top: 400,
    width: 350,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
  },
  charCount: {
    fontFamily: 'InterRegular',
    fontSize: 13,
    color: 'grey',
    textAlign: 'right',
    marginTop: 5,
    position: 'absolute',
    top: 660,
    right: -160,
  },
  tooltip: {
    fontFamily: 'InterRegular',
    position: 'absolute',
    top: '81%',
    left: '74%',
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
  errorBorder: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
})

export default ProfileDescription
