import React from 'react';
import { ProfileDescriptionWrapper, StyledNickname, InfoWrapper, StyledCuisine, StyledInfo, StyledDescription } from './index.styled';
import { BiSolidDish } from 'react-icons/bi';

interface ProfileDescriptionProps {
  description: string;
  nickname: string;
  cuisine: string;
  onChange: (field: string, value: string) => void;
}

const ProfileDescription: React.FC<ProfileDescriptionProps> = ({ description, nickname, cuisine, onChange }) => {
  return (
    <ProfileDescriptionWrapper>
      <StyledNickname
        type='text'
        name='nickname'
        value={nickname}
        onChange={(e) => onChange('nickname', e.target.value)}
        placeholder='Nickname'
      />
      <InfoWrapper>
        <BiSolidDish color='grey' />
        <StyledCuisine>Cuisine Type - </StyledCuisine>
        <StyledInfo
          name='description'
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder='About you'
        />
      </InfoWrapper>
      <StyledDescription
        name='cuisine'
        value={cuisine}
        onChange={(e) => onChange('cuisine', e.target.value)}
        placeholder='Favorite cuisine type'
      />
    </ProfileDescriptionWrapper>
  );
};

export default ProfileDescription;
