import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { BodyWrapper, ProfileWrapper } from '../ProfilePage/index.styled';

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
          <img src={`http://localhost:3001/assets/images/${profile.profilePicture}`} alt='Profile' />
          <h1>{profile.nickname}</h1>
          <p>Description: {profile.description}</p>
          <p>Location: {profile.location}</p>
          <p>Cuisine: {profile.cuisine}</p>
          <p>Registered at: {profile.registeredAt}</p>
          <p>Last online: {profile.lastOnline}</p>
        </ProfileWrapper>
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default PublicProfilePage;
