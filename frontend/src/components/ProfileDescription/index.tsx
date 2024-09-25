import React from 'react';
import { BiSolidDish } from 'react-icons/bi';
import {
  ProfileDescriptionWrapper,
  StyledNickname,
  StyledNickkname,
  InfoWrapper,
  StyledAbout,
  StyledCuisine,
  StyledInfo,
  StyledDescription,
} from './index.styled';

interface ProfileDescriptionProps {
  description: string;
  nickname: string;
  cuisine: string;
  onChange: (field: string, value: string) => void;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({ description, nickname, cuisine, onChange }) => {
  return (
    <ProfileDescriptionWrapper>
      {/* <StyledNickname
        type='text'
        name='nickname'
        value={nickname}
        onChange={(e) => onChange('nickname', e.target.value)}
        placeholder='Nickname'
      /> */}
      <StyledNickkname>{nickname}</StyledNickkname>
      <InfoWrapper>
        <BiSolidDish color='grey' style={{ marginTop: '5px' }} />
        <StyledCuisine>Favorite cuisine type - </StyledCuisine>
        <StyledInfo
          name='cuisine'
          value={cuisine}
          onChange={(e) => onChange('cuisine', e.target.value)}
          placeholder='Your favorite cuisine type'
        />
      </InfoWrapper>
      <StyledAbout>About you</StyledAbout>
      <StyledDescription
        name='description'
        value={description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder='Here you can tell about you'
      />
    </ProfileDescriptionWrapper>
  );
};

export default ProfileDescription;
