import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@components/Header';
import BurgerMenu from '@components/BurgerMenu';
import Footer from '@components/Footer';
import InputForm from '@components/InputForm';
import FilterList from '@components/FilterList';
import RecipeList from '@components/RecipeList';
import ErrorBoundary from '@components/ErrorBoundary';
import { BodyWrapper, FiltersWrapper, MainTitle, SectionWrapper, BorderLine, SectionTitle } from './index.styled';

const dietOptions = [
  { key: 'Balanced', value: 'Balanced' },
  { key: 'HighFiber', value: 'High-fiber' },
  { key: 'HighProtein', value: 'High-protein' },
  { key: 'LowCarb', value: 'Low-carb' },
];

const dishTypeOptions = [
  { key: 'Bread', value: 'Bread' },
  { key: 'Drinks', value: 'Drinks' },
  { key: 'Desserts', value: 'Desserts' },
  { key: 'Salad', value: 'Salad' },
];

const HomePage: React.FC = () => {
  const [dietFilter, setDietFilter] = useState('');
  const [dishTypeFilter, setDishTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('chicken');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { t } = useTranslation();

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
    const selectedOption = dietOptions.find((option) => option.value === filter);
    handleFilterChange('diet', selectedOption ? selectedOption.value : '');
  };

  const handleDishTypeFilterChange = (filter: string) => {
    const selectedOption = dishTypeOptions.find((option) => option.value === filter);
    handleFilterChange('dishType', selectedOption ? selectedOption.value : '');
  };

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  return (
    <>
      <Header>{isMobile && <BurgerMenu />}</Header>
      <BodyWrapper>
        <MainTitle>{t('recipeListTitle')}</MainTitle>
        <InputForm onSearch={handleSearch} />
        <FiltersWrapper>
          <FilterList
            title={t('selectByDiet')}
            options={dietOptions.map((option) => ({
              ...option,
              label: t(`selectByDiet${option.key}`),
            }))}
            onSelect={handleDietFilterChange}
          />
          <FilterList
            title={t('selectByDishType')}
            options={dishTypeOptions.map((option) => ({
              ...option,
              label: t(`selectByDishType${option.key}`),
            }))}
            onSelect={handleDishTypeFilterChange}
          />
        </FiltersWrapper>
        <SectionWrapper>
          <BorderLine />
          <SectionTitle>{t('searchedDishes')}</SectionTitle>
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
