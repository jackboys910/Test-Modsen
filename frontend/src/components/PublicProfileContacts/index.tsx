import React from 'react';
import { ProfileContactsWrapper } from '@components/ProfileContacts/index.styled';
import { StyledSendMessage } from './index.styled';

const PublicProfileContacts: React.FC = () => {
  return (
    <ProfileContactsWrapper>
      <StyledSendMessage>Send Message</StyledSendMessage>
    </ProfileContactsWrapper>
  );
};

export default PublicProfileContacts;
