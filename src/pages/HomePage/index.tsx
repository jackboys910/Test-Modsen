import React, { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import InputForm from '@components/InputForm';
import FilterList from '@components/FilterList';
import RecipeList from '@components/RecipeList';
import { BodyWrapper, FiltersWrapper, MainTitle, SectionWrapper, BorderLine, SectionTitle } from './index.styled';

const dietOptions = ['Balanced', 'High-fiber', 'High-protein', 'Low-carb'];
const dishTypeOptions = ['Bread', 'Drinks', 'Desserts', 'Salad'];

const HomePage: React.FC = () => {
  const [dietFilter, setDietFilter] = useState('');
  const [dishTypeFilter, setDishTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('chicken');
  const [triggerSearch, setTriggerSearch] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setTriggerSearch(!triggerSearch);
  };

  const handleFilterChange = (filterType: string, filterValue: string) => {
    if (filterType === 'diet') {
      setDietFilter(filterValue);
    } else if (filterType === 'dishType') {
      setDishTypeFilter(filterValue);
    }
    setTriggerSearch(!triggerSearch);
  };

  const handleDietFilterChange = (filter: string) => {
    handleFilterChange('diet', filter);
  };

  const handleDishTypeFilterChange = (filter: string) => {
    handleFilterChange('dishType', filter);
  };

  return (
    <>
      <Header />
      <BodyWrapper>
        <MainTitle>Discover Recipe & Delicious Food</MainTitle>
        <InputForm onSearch={handleSearch} />
        <FiltersWrapper>
          <FilterList title='Select by diet' options={dietOptions} onSelect={handleDietFilterChange} />
          <FilterList title='Select by dish type' options={dishTypeOptions} onSelect={handleDishTypeFilterChange} />
        </FiltersWrapper>
        <SectionWrapper>
          <BorderLine />
          <SectionTitle>Founded dishes</SectionTitle>
        </SectionWrapper>
        <RecipeList searchQuery={searchQuery} dietFilter={dietFilter} dishTypeFilter={dishTypeFilter} triggerSearch={triggerSearch} />
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default HomePage;
