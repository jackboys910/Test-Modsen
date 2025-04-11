import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PublicProfileContactsWrapper, StyledSendMessage } from './index.styled';

interface IPublicProfileContactsProps {
  nickname: string;
}

const PublicProfileContacts: React.FC<IPublicProfileContactsProps> = ({ nickname }) => {
  const navigate = useNavigate();
  const loggedInUserNickname = localStorage.getItem('nickname');
  const { t } = useTranslation();

  const handleSendMessageClick = () => {
    navigate(`/messanger/${loggedInUserNickname}`, {
      state: {
        receiverNickname: nickname,
      },
    });
  };

  return (
    <PublicProfileContactsWrapper>
      <StyledSendMessage onClick={handleSendMessageClick}>{t('sendMessage')}</StyledSendMessage>
    </PublicProfileContactsWrapper>
  );
};

export default PublicProfileContacts;
