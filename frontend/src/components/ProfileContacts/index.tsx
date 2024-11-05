import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContactsWrapper, StyledSignOutButton, StyledUpdateProfile, StyledMessages } from './index.styled';

interface ProfileContactsProps {
  onUpdateProfile: (e: React.FormEvent) => void;
  handleSignOut: () => void;
  nickname: string;
}

const ProfileContacts: React.FC<ProfileContactsProps> = ({ onUpdateProfile, handleSignOut, nickname }) => {
  const navigate = useNavigate();

  return (
    <ProfileContactsWrapper>
      <StyledSignOutButton onClick={handleSignOut} />
      {/* <StyledSignOut onClick={handleSignOut}>Sign out</StyledSignOut> */}
      <StyledUpdateProfile type='submit' onClick={onUpdateProfile}>
        Update Profile
      </StyledUpdateProfile>
    </ProfileContactsWrapper>
  );
};

export default ProfileContacts;
