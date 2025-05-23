import React from 'react';
import { useTranslation } from 'react-i18next';
import { RxCross2 } from 'react-icons/rx';
import { SearchWrapper, UsersIcon, SearchInput, ClearButton } from './index.styled';

const SearchInputWithClear: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const handleClear = () => {
    onChange('');
  };

  return (
    <SearchWrapper>
      <UsersIcon />
      <SearchInput type='text' placeholder={t('search')} value={value} onChange={(e) => onChange(e.target.value)} />
      <ClearButton onClick={handleClear}>
        <RxCross2 />
      </ClearButton>
    </SearchWrapper>
  );
};

export default SearchInputWithClear;
