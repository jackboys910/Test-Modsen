import React, { useState } from 'react';
import { Section, Header, Content, Item } from './index.styled';

interface IFilterListProps {
  title: string;
  options: string[];
  onSelect: (filter: string) => void;
}

const FilterList: React.FC<IFilterListProps> = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    const newSelection = selectedOption === option ? null : option;
    setSelectedOption(newSelection);
    onSelect(newSelection || '');
  };

  const handleItemClick = (option: string) => {
    return () => {
      handleSelect(option);
    };
  };

  return (
    <Section>
      <Header onClick={handleToggle}>{title}</Header>
      <Content $isOpen={isOpen}>
        {options.map((option) => (
          <Item key={option} onClick={handleItemClick(option)} className={selectedOption === option ? 'selected' : ''}>
            {option}
          </Item>
        ))}
      </Content>
    </Section>
  );
};

export default FilterList;
