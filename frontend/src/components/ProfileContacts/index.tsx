import React, { useState } from 'react';
import FeedbackModal from '@components/FeedbackModal';
import { ProfileContactsWrapper, StyledSignOutButton, StyledUpdateProfile, StyledFeedbackButton } from './index.styled';

interface ProfileContactsProps {
  onUpdateProfile: (e: React.FormEvent) => void;
  handleSignOut: () => void;
}

const ProfileContacts: React.FC<ProfileContactsProps> = ({ onUpdateProfile, handleSignOut }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const toggleFeedbackModal = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  return (
    <ProfileContactsWrapper>
      <StyledSignOutButton onClick={handleSignOut} />
      <StyledUpdateProfile type='submit' onClick={onUpdateProfile}>
        Update Profile
      </StyledUpdateProfile>
      <StyledFeedbackButton onClick={toggleFeedbackModal}>Leave Feedback</StyledFeedbackButton>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={toggleFeedbackModal} />
    </ProfileContactsWrapper>
  );
};

export default ProfileContacts;
