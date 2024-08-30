import React, { useState, useCallback } from 'react';
import { Section, Header, Content, Item } from './index.styled';

interface IFilterListProps {
  title: string;
  options: string[];
  onSelect: (filter: string) => void;
}

const FilterList: React.FC<IFilterListProps> = ({ title, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSelect = useCallback(
    (option: string) => {
      const newSelection = selectedOption === option ? null : option;
      setSelectedOption(newSelection);
      onSelect(newSelection || '');
    },
    [selectedOption, onSelect],
  );

  const handleItemClick = useCallback(
    (option: string) => {
      return () => {
        handleSelect(option);
      };
    },
    [handleSelect],
  );

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
