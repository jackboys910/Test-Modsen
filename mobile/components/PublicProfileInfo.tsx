import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import Foundation from '@expo/vector-icons/Foundation'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import Feather from '@expo/vector-icons/Feather'
import Octicons from '@expo/vector-icons/Octicons'
import calculateRelativeTime from '../utils/calculateOnline'
import { SERVER_IP } from '../constants/config'

interface IPublicProfileInfoProps {
  profilePicture: string
  phoneNumber: string
  location: string
  registeredAt: string
  lastOnline: string
}

const PublicProfileInfo: React.FC<IPublicProfileInfoProps> = ({
  profilePicture,
  phoneNumber,
  location,
  registeredAt,
  lastOnline,
}) => {
  const relativeLastOnline = calculateRelativeTime(lastOnline)

  return (
    <View style={styles.profileInfoWrapper}>
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: `${SERVER_IP}/assets/images/${profilePicture}`,
          }}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.aboutWrapper}>
        <View style={styles.dataWrapper}>
          <Foundation
            name="telephone"
            size={20}
            color="grey"
            style={styles.icon}
          />
          <Text style={styles.styledInformation}>
            {phoneNumber || 'No information'}
          </Text>
        </View>
        <View style={styles.dataWrapper}>
          <FontAwesome6
            name="location-dot"
            size={20}
            color="grey"
            style={styles.icon}
          />
          <Text
            style={styles.styledInformation}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {location || 'No information'}
          </Text>
        </View>
        <View style={styles.dataWrapper}>
          <Feather
            name="clock"
            size={20}
            color="grey"
            style={[styles.icon, { left: -2 }]}
          />
          <Text style={styles.timeText}>Registered since: {registeredAt}</Text>
        </View>
        <View style={styles.dataWrapper}>
          <Octicons
            name="dot-fill"
            size={20}
            color={relativeLastOnline !== 'Online' ? 'grey' : 'green'}
            style={[styles.icon, { left: 3 }]}
          />
          <Text style={styles.timeText}>
            {relativeLastOnline !== 'Online'
              ? 'Last online: ' + relativeLastOnline
              : relativeLastOnline}
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
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
    padding: 8,
  },
  profileImage: {
    height: 340,
    width: 340,
    resizeMode: 'cover',
  },
  aboutWrapper: {
    position: 'absolute',
    top: 450,
    left: 14,
  },
  dataWrapper: {
    display: 'flex',
    gap: 5,
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginBottom: 5,
  },
  icon: {
    position: 'absolute',
    top: 5,
  },
  styledInformation: {
    fontFamily: 'RobotoRegular',
    width: 320,
    margin: 0,
    padding: 5,
    height: 30,
    marginLeft: 18,
  },
  timeText: {
    fontFamily: 'InterRegular',
    fontSize: 15,
    marginTop: 3,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 23,
  },
})

export default PublicProfileInfo
