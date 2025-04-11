import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n';
import calculateRelativeTime from '@utils/calculateOnline';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BurgerMenu from '@components/BurgerMenu';
import ProfileInfo from '@components/ProfileInfo';
import ProfileDescription from '@components/ProfileDescription';
import ProfileContacts from '@components/ProfileContacts';
import { BodyWrapper, ProfileWrapper, StyledForm, StyledLink } from './index.styled';

const ProfilePage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [profile, setProfile] = useState({
    profilePicture: 'defaultUser.png',
    description: '',
    phoneNumber: '',
    location: '',
    registeredAt: '',
    lastOnline: '',
    nickname: '',
    cuisine: '',
  });
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [pictureErrorMessage, setPictureErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    phoneNumber: false,
    location: false,
    cuisine: false,
    description: false,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/getProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile({
          profilePicture: data.profile_picture || 'defaultUser.png',
          description: data.description || '',
          phoneNumber: data.phone_number || '',
          location: data.location || '',
          registeredAt: new Date(data.registered_at).toLocaleDateString(),
          lastOnline: calculateRelativeTime(data.last_online),
          nickname: data.nickname || '',
          cuisine: data.cuisine || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('language');
    i18n.changeLanguage('en');
    navigate('/authorization');
  };

  const validateInputs = () => {
    const phoneNumberValid = profile.phoneNumber === '' || /^[\d+]{1,15}$/.test(profile.phoneNumber);
    const locationValid = profile.location === '' || /^[a-zA-Z0-9., ]{0,50}$/.test(profile.location);
    const cuisineValid = profile.cuisine === '' || /^[a-zA-Z, ]{0,35}$/.test(profile.cuisine);
    const descriptionValid = profile.description.length <= 520;

    setErrors({
      phoneNumber: !phoneNumberValid,
      location: !locationValid,
      cuisine: !cuisineValid,
      description: !descriptionValid,
    });

    return phoneNumberValid && locationValid && cuisineValid && descriptionValid;
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (newProfilePicture) {
        formData.append('profilePicture', newProfilePicture);
      }
      const response = await fetch('http://localhost:3001/updateProfile', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile({
          profilePicture: updatedProfile.profile_picture || 'defaultUser.png',
          description: updatedProfile.description || '',
          phoneNumber: updatedProfile.phone_number || '',
          location: updatedProfile.location || '',
          registeredAt: new Date(updatedProfile.registered_at).toLocaleDateString(),
          lastOnline: calculateRelativeTime(updatedProfile.last_online),
          nickname: updatedProfile.nickname || '',
          cuisine: updatedProfile.cuisine || '',
        });
        setNewProfilePicture(null);
        setPictureErrorMessage(null);
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
  };

  const handleFileChange = (file: File) => {
    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validFileTypes.includes(file.type)) {
      setPictureErrorMessage(t('supportedFileTypes'));
      return;
    }
    setNewProfilePicture(file);
    setPictureErrorMessage(null);
  };

  return (
    <>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>{t('home')}</StyledLink>}</Header>
      <BodyWrapper>
        <ProfileWrapper>
          <StyledForm onSubmit={handleProfileUpdate}>
            <ProfileInfo
              profilePicture={profile.profilePicture}
              phoneNumber={profile.phoneNumber}
              location={profile.location}
              registeredAt={profile.registeredAt}
              lastOnline={profile.lastOnline}
              onChange={handleChange}
              onFileChange={handleFileChange}
              pictureErrorMessage={pictureErrorMessage}
              errors={errors}
            />
            <ProfileDescription
              description={profile.description}
              nickname={profile.nickname}
              cuisine={profile.cuisine}
              onChange={handleChange}
              errors={errors}
            />
            <ProfileContacts handleSignOut={handleSignOut} onUpdateProfile={handleProfileUpdate} />
          </StyledForm>
        </ProfileWrapper>
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default ProfilePage;
