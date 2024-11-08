import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicProfileContactsWrapper, StyledSendMessage } from './index.styled';

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
    <PublicProfileContactsWrapper>
      <StyledSendMessage onClick={handleSendMessageClick}>Send Message</StyledSendMessage>
    </PublicProfileContactsWrapper>
  );
};

export default PublicProfileContacts;
