import React, { useState } from 'react';
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

  const toggleTooltip = (field: string) => {
    setShowTooltip((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <ProfileDescriptionWrapper>
      <StyledNickname>{nickname}</StyledNickname>
      <InfoWrapper>
        <BiSolidDish color='grey' style={{ marginTop: '5px' }} />
        <StyledCuisine>Favorite cuisine type - </StyledCuisine>
        <StyledInfo
          name='cuisine'
          value={cuisine}
          onChange={(e) => onChange('cuisine', e.target.value)}
          placeholder='Your favorite cuisine type'
          style={{ border: errors.cuisine ? '2px solid red' : undefined }}
        />
        <QuestionIcon
          size={14}
          onMouseEnter={() => setShowTooltip({ ...showTooltip, cuisine: true })}
          onMouseLeave={() => setShowTooltip({ ...showTooltip, cuisine: false })}
          onClick={() => toggleTooltip('cuisine')}
          style={{ color: errors.cuisine ? 'green' : 'grey' }}
        />
        {showTooltip.cuisine && <Tooltip>English letters, ',', '.', max 35 characters</Tooltip>}
      </InfoWrapper>
      <StyledAbout>About you</StyledAbout>
      <StyledDescription
        name='description'
        value={description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder='Here you can tell about you'
        style={{ border: errors.description || description.length > 520 ? '2px solid red' : undefined }}
      />
      <CharCount style={{ color: description.length > 520 ? 'red' : 'grey' }}>{description.length}/520</CharCount>
    </ProfileDescriptionWrapper>
  );
};

export default ProfileDescription;
