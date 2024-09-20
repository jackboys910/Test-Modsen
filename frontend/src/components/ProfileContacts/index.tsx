import React from 'react';
import { ProfileContactsWrapper, StyledSignOut, StyledUpdateProfile, StyledSendMessage } from './index.styled';

interface ProfileContactsProps {
  onUpdateProfile: (e: React.FormEvent) => void;
  handleSignOut: () => void;
}

const ProfileContacts: React.FC<ProfileContactsProps> = ({ onUpdateProfile, handleSignOut }) => {
  return (
    <ProfileContactsWrapper>
      <StyledSignOut onClick={handleSignOut}>Sign out</StyledSignOut>
      <StyledUpdateProfile type='submit' onClick={onUpdateProfile}>
        Update Profile
      </StyledUpdateProfile>
      <StyledSendMessage>Send Message</StyledSendMessage>
    </ProfileContactsWrapper>
  );
};

export default ProfileContacts;
