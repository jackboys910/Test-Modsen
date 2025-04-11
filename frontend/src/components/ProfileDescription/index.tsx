import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiSolidDish } from 'react-icons/bi';
import {
  ProfileDescriptionWrapper,
  StyledNickname,
  InfoWrapper,
  StyledAbout,
  StyledCuisine,
  StyledInfo,
  QuestionIcon,
  Tooltip,
  StyledDescription,
  CharCount,
} from './index.styled';

interface ProfileDescriptionProps {
  description: string;
  nickname: string;
  cuisine: string;
  onChange: (field: string, value: string) => void;
  errors: {
    cuisine: boolean;
    description: boolean;
  };
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({ description, nickname, cuisine, onChange, errors }) => {
  const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>({
    cuisine: false,
  });
  const { t, i18n } = useTranslation();

  const toggleTooltip = (field: string) => {
    setShowTooltip((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <ProfileDescriptionWrapper>
      <StyledNickname>{nickname}</StyledNickname>
      <InfoWrapper>
        <BiSolidDish color='grey' style={{ marginTop: '5px' }} />
        <StyledCuisine>{t('favoriteCuisineType')}</StyledCuisine>
        <StyledInfo
          name='cuisine'
          value={cuisine}
          onChange={(e) => onChange('cuisine', e.target.value)}
          placeholder={t('yourFavoriteCuisineType')}
          style={{ border: errors.cuisine ? '2px solid red' : undefined }}
        />
        <QuestionIcon
          size={14}
          lang={i18n.language}
          onMouseEnter={() => setShowTooltip({ ...showTooltip, cuisine: true })}
          onMouseLeave={() => setShowTooltip({ ...showTooltip, cuisine: false })}
          onClick={() => toggleTooltip('cuisine')}
          style={{ color: errors.cuisine ? 'green' : 'grey' }}
        />
        {showTooltip.cuisine && <Tooltip lang={i18n.language}>{t('yourFavoriteCuisineTypeDescription')}</Tooltip>}
      </InfoWrapper>
      <StyledAbout>{t('aboutYou')}</StyledAbout>
      <StyledDescription
        name='description'
        value={description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder={t('aboutYouPlaceholder')}
        // style={{ border: errors.description || description.length > 520 ? '1px solid red' : undefined }}
      />
      <CharCount style={{ color: description.length > 520 ? 'red' : 'grey' }}>{description.length}/520</CharCount>
    </ProfileDescriptionWrapper>
  );
};

export default ProfileDescription;
