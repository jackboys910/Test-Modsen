import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import PublicProfileInfo from '@components/PublicProfileInfo';
import PublicProfileDescription from '@components/PublicProfileDescription';
import PublicProfileContacts from '@components/PublicProfileContacts';
import { BodyWrapper, ProfileWrapper } from '../ProfilePage/index.styled';
import { StyledContainer } from './index.styled';

const PublicProfilePage: React.FC = () => {
  const { nickname } = useParams<{ nickname: string }>();
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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getProfileByNickname/${nickname}`);
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        setProfile({
          profilePicture: data.profile_picture || 'defaultUser.png',
          description: data.description || '',
          phoneNumber: data.phone_number || '',
          location: data.location || '',
          registeredAt: new Date(data.registered_at).toLocaleDateString(),
          lastOnline: data.last_online,
          nickname: data.nickname || '',
          cuisine: data.cuisine || '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [nickname]);

  return (
    <>
      <Header />
      <BodyWrapper>
        <ProfileWrapper>
          <StyledContainer>
            <PublicProfileInfo
              profilePicture={profile.profilePicture}
              phoneNumber={profile.phoneNumber}
              location={profile.location}
              registeredAt={profile.registeredAt}
              lastOnline={profile.lastOnline}
            />
            <PublicProfileDescription description={profile.description} nickname={profile.nickname} cuisine={profile.cuisine} />
            <PublicProfileContacts />
          </StyledContainer>
        </ProfileWrapper>
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default PublicProfilePage;
