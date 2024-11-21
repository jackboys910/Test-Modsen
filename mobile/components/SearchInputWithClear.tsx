import React from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import Entypo from '@expo/vector-icons/Entypo'

interface SearchInputWithClearProps {
  value: string
  onChange: (value: string) => void
}

const SearchInputWithClear: React.FC<SearchInputWithClearProps> = ({
  value,
  onChange,
}) => {
  const handleClear = () => {
    onChange('')
  }

  return (
    <View style={styles.searchWrapper}>
      <Feather name="users" size={25} color="black" style={styles.usersIcon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={value}
        onChangeText={onChange}
      />
      {value ? (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <Entypo name="cross" size={18} color="#999" />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  usersIcon: {
    width: 25,
    height: 25,
  },
  searchInput: {
    paddingLeft: 15,
    paddingRight: 45,
    paddingVertical: 8,
    width: 275,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    color: '#555',
    height: 37,
  },
  clearButton: {
    position: 'absolute',
    right: 30,
    top: '35%',
    fontSize: 18,
    color: '#999',
  },
})

export default SearchInputWithClear
