import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiSolidDish } from 'react-icons/bi';
import { ProfileDescriptionWrapper, StyledNickname, InfoWrapper, StyledCuisine, StyledAbout, StyledDescription } from './index.styled';

interface IPublicProfileDescriptionProps {
  description: string;
  nickname: string;
  cuisine: string;
}

const PublicProfileDescription: React.FC<IPublicProfileDescriptionProps> = ({ description, cuisine, nickname }) => {
  const { t } = useTranslation();

  return (
    <ProfileDescriptionWrapper>
      <StyledNickname>{nickname}</StyledNickname>
      <InfoWrapper>
        <BiSolidDish color='grey' style={{ marginTop: '5px' }} />
        <StyledCuisine>
          {t('favoriteCuisineType')}
          {cuisine ? cuisine : t('noInformation')}
        </StyledCuisine>
      </InfoWrapper>
      <StyledAbout>{t('aboutUser')}</StyledAbout>
      <StyledDescription>{description ? description : t('noInformation')}</StyledDescription>
    </ProfileDescriptionWrapper>
  );
};

export default PublicProfileDescription;
