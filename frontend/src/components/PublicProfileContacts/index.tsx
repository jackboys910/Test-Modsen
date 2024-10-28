import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileContactsWrapper } from '@components/ProfileContacts/index.styled';
import { StyledSendMessage } from './index.styled';

interface IPublicProfileContactsProps {
  nickname: string;
}

const PublicProfileContacts: React.FC<IPublicProfileContactsProps> = ({ nickname }) => {
  const navigate = useNavigate();
  const loggedInUserNickname = localStorage.getItem('nickname');

  const handleSendMessageClick = () => {
    navigate(`/messanger/${loggedInUserNickname}`, {
      state: {
        receiverNickname: nickname,
      },
    });
  };

  return (
    <ProfileContactsWrapper>
      <StyledSendMessage onClick={handleSendMessageClick}>Send Message</StyledSendMessage>
    </ProfileContactsWrapper>
  );
};

export default PublicProfileContacts;
