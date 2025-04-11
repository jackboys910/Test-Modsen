import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FeedbackModal from '@components/FeedbackModal';
import { ProfileContactsWrapper, StyledSignOutButton, StyledUpdateProfile, StyledFeedbackButton, LanguageSelect } from './index.styled';

interface ProfileContactsProps {
  onUpdateProfile: (e: React.FormEvent) => void;
  handleSignOut: () => void;
}

const ProfileContacts: React.FC<ProfileContactsProps> = ({ onUpdateProfile, handleSignOut }) => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleFeedbackModal = () => {
    setIsFeedbackOpen(!isFeedbackOpen);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem('language', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <ProfileContactsWrapper>
      <StyledSignOutButton onClick={handleSignOut} />
      <StyledUpdateProfile type='submit' onClick={onUpdateProfile}>
        {t('updateProfile')}
      </StyledUpdateProfile>
      <StyledFeedbackButton onClick={toggleFeedbackModal}>{t('leaveFeedback')}</StyledFeedbackButton>
      <LanguageSelect onChange={handleLanguageChange} defaultValue={i18n.language}>
        <option value='en'>English</option>
        <option value='ru'>Русский</option>
      </LanguageSelect>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={toggleFeedbackModal} />
    </ProfileContactsWrapper>
  );
};

export default ProfileContacts;
