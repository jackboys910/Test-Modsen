import React, { useState, useEffect } from 'react';
import Header from '@components/Header';
import BurgerMenu from '@components/BurgerMenu';
import Footer from '@components/Footer';
import InputForm from '@components/InputForm';
import FilterList from '@components/FilterList';
import RecipeList from '@components/RecipeList';
import ErrorBoundary from '@components/ErrorBoundary';
import { BodyWrapper, FiltersWrapper, MainTitle, SectionWrapper, BorderLine, SectionTitle } from './index.styled';

const dietOptions = ['Balanced', 'High-fiber', 'High-protein', 'Low-carb'];
const dishTypeOptions = ['Bread', 'Drinks', 'Desserts', 'Salad'];

const HomePage: React.FC = () => {
  const [dietFilter, setDietFilter] = useState('');
  const [dishTypeFilter, setDishTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('chicken');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  return (
    <>
      <Header>{isMobile && <BurgerMenu />}</Header>
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
        <ErrorBoundary>
          <RecipeList searchQuery={searchQuery} dietFilter={dietFilter} dishTypeFilter={dishTypeFilter} triggerSearch={triggerSearch} />
        </ErrorBoundary>
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default HomePage;
