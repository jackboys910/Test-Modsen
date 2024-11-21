import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import BurgerMenu from '../../components/BurgerMenu'
import Footer from '../../components/Footer'
import InputForm from '../../components/InputForm'
import FilterList from '../../components/FilterList'
import RecipeList from '../../components/RecipeList'
import ErrorBoundary from '../../components/ErrorBoundary'
import { COLORS } from '../../constants/styles/mainColors'

const dietOptions = ['Balanced', 'High-fiber', 'High-protein', 'Low-carb']
const dishTypeOptions = ['Bread', 'Drinks', 'Desserts', 'Salad']

const Home: React.FC = () => {
  const [dietFilter, setDietFilter] = useState('')
  const [dishTypeFilter, setDishTypeFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('chicken')
  const [triggerSearch, setTriggerSearch] = useState(false)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setTriggerSearch(!triggerSearch)
  }

  const handleFilterChange = (filterType: string, filterValue: string) => {
    if (filterType === 'diet') {
      setDietFilter(filterValue)
    } else if (filterType === 'dishType') {
      setDishTypeFilter(filterValue)
    }
    setTriggerSearch(!triggerSearch)
  }

  const handleDietFilterChange = (filter: string) => {
    handleFilterChange('diet', filter)
  }

  const handleDishTypeFilterChange = (filter: string) => {
    handleFilterChange('dishType', filter)
  }

  return (
    <ScrollView style={{ height: '100%' }}>
      <Header>
        <BurgerMenu />
      </Header>
      <View style={styles.bodyWrapper}>
        <InputForm onSearch={handleSearch} />
        <View style={styles.filtersWrapper}>
          <FilterList
            title="Select by diet"
            options={dietOptions}
            onSelect={handleDietFilterChange}
          />
          <FilterList
            title="Select by dish type"
            options={dishTypeOptions}
            onSelect={handleDishTypeFilterChange}
          />
        </View>
        <View style={styles.sectionWrapper}>
          <View style={styles.borderLine} />
          <Text style={styles.sectionTitle}>Founded dishes</Text>
        </View>
        <ErrorBoundary>
          <RecipeList
            searchQuery={searchQuery}
            dietFilter={dietFilter}
            dishTypeFilter={dishTypeFilter}
            triggerSearch={triggerSearch}
          />
        </ErrorBoundary>
      </View>
      <Footer />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90%',
    margin: 0,
    backgroundColor: 'white',
  },
  filtersWrapper: {
    height: 236,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 160,
    marginBottom: 200,
    marginLeft: '2%',
  },
  sectionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  borderLine: {
    width: 44,
    height: 3,
    backgroundColor: '#efc81a',
    transform: [{ rotate: '-90deg' }],
    marginRight: -5,
  },
  sectionTitle: {
    margin: 0,
    fontFamily: 'Inter-Regular',
    fontWeight: '400',
    fontSize: 30,
    lineHeight: 48.41,
  },
})

export default Home
