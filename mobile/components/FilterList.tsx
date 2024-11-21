import React, { useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '../constants/styles/mainColors'

interface IFilterListProps {
  title: string
  options: string[]
  onSelect: (filter: string) => void
}

const FilterList: React.FC<IFilterListProps> = ({
  title,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const handleSelect = useCallback(
    (option: string) => {
      const newSelection = selectedOption === option ? null : option
      setSelectedOption(newSelection)
      onSelect(newSelection || '')
    },
    [selectedOption, onSelect]
  )

  const handleItemClick = useCallback(
    (option: string) => {
      return () => {
        handleSelect(option)
      }
    },
    [handleSelect]
  )

  return (
    <View style={styles.section}>
      <TouchableOpacity onPress={handleToggle} style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.content}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={handleItemClick(option)}
              style={[
                styles.item,
                selectedOption === option && styles.selectedItem,
              ]}
            >
              <Text
                style={
                  selectedOption === option
                    ? styles.selectedText
                    : styles.itemText
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    width: 335,
    marginLeft: 7,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 25,
    borderBottomWidth: 1,
    borderColor: COLORS.COLOR_STROKE_ORANGE,
    width: 335,
    marginBottom: 27,
  },
  headerText: {
    color: COLORS.COLOR_SECTION_GREY,
    fontSize: 16,
  },
  content: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.COLOR_STROKE_ORANGE,
    marginTop: -10,
    width: 335,
    marginBottom: 20,
  },
  item: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  itemText: {
    color: COLORS.COLOR_OPTION_DARKGREY,
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: COLORS.COLOR_MAIN_BLUE,
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
})

export default FilterList
