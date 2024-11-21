import React from 'react'
import { View, StyleSheet } from 'react-native'
import { COLORS } from '../constants/styles/mainColors'

const Footer: React.FC = () => {
  return <View style={styles.footer} />
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: COLORS.COLOR_MAIN_BLUE,
    width: '100%',
    height: 100,
    marginTop: 'auto',
  },
})

export default Footer
