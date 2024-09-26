import React from 'react';
import { BiSolidDish } from 'react-icons/bi';
import { ProfileDescriptionWrapper, StyledNickname, InfoWrapper } from '@components/ProfileDescription/index.styled';
import { StyledCuisine, StyledAbout, StyledDescription } from './index.styled';

interface IPublicProfileDescriptionProps {
  description: string;
  nickname: string;
  cuisine: string;
}

const PublicProfileDescription: React.FC<IPublicProfileDescriptionProps> = ({ description, cuisine, nickname }) => {
  return (
    <ProfileDescriptionWrapper>
      <StyledNickname>{nickname}</StyledNickname>
      <InfoWrapper>
        <BiSolidDish color='grey' style={{ marginTop: '5px' }} />
        <StyledCuisine>Favorite cuisine type - {cuisine ? cuisine : 'No information'}</StyledCuisine>
      </InfoWrapper>
      <StyledAbout>About user</StyledAbout>
      <StyledDescription>{description ? description : 'No information'}</StyledDescription>
    </ProfileDescriptionWrapper>
  );
};

export default PublicProfileDescription;
