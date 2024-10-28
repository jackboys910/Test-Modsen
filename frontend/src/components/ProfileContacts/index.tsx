import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContactsWrapper, StyledSignOut, StyledUpdateProfile, StyledMessages } from './index.styled';

interface ProfileContactsProps {
  onUpdateProfile: (e: React.FormEvent) => void;
  handleSignOut: () => void;
  nickname: string;
}

const ProfileContacts: React.FC<ProfileContactsProps> = ({ onUpdateProfile, handleSignOut, nickname }) => {
  const navigate = useNavigate();

  const handleMessagesClick = () => {
    navigate(`/messanger/${nickname}`);
  };

  return (
    <ProfileContactsWrapper>
      <StyledSignOut onClick={handleSignOut}>Sign out</StyledSignOut>
      <StyledUpdateProfile type='submit' onClick={onUpdateProfile}>
        Update Profile
      </StyledUpdateProfile>
      <StyledMessages onClick={handleMessagesClick}>Messages</StyledMessages>
    </ProfileContactsWrapper>
  );
};

export default ProfileContacts;
