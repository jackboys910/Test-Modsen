import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
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

  const calculateRelativeTime = (lastOnline: string) => {
    const lastOnlineDate = new Date(lastOnline);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - lastOnlineDate.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Online';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/authorization');
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setPictureErrorMessage('Supported file types are: jpeg, jpg, png, gif');
      return;
    }
    setNewProfilePicture(file);
    setPictureErrorMessage(null);
  };

  return (
    // <>
    //   <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
    //   <BodyWrapper>
    //     <h1>Your profile</h1>
    //     <img src={`http://localhost:3001/assets/images/${profile.profilePicture}`} alt='Profile' />
    //     <form onSubmit={handleProfileUpdate}>
    //       <input type='file' name='profilePicture' accept='image/*' />
    //       <textarea
    //         name='description'
    //         value={profile.description}
    //         onChange={(e) => setProfile({ ...profile, description: e.target.value })}
    //         placeholder='About you'
    //       />
    //       <input
    //         type='text'
    //         name='nickname'
    //         value={profile.nickname}
    //         onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
    //         placeholder='Nickname'
    //       />
    //       <input
    //         type='text'
    //         name='cuisine'
    //         value={profile.cuisine}
    //         onChange={(e) => setProfile({ ...profile, cuisine: e.target.value })}
    //         placeholder='Favorite cuisine type'
    //       />
    //       <input
    //         type='text'
    //         name='phoneNumber'
    //         value={profile.phoneNumber}
    //         onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
    //         placeholder='Phone number'
    //       />
    //       <input
    //         type='text'
    //         name='location'
    //         value={profile.location}
    //         onChange={(e) => setProfile({ ...profile, location: e.target.value })}
    //         placeholder='Location'
    //       />
    //       <button type='submit'>Update Profile</button>
    //     </form>
    //     <p>Registered since: {profile.registeredAt}</p>
    //     <p>Last online: {profile.lastOnline}</p>
    //     <button onClick={handleSignOut}>Sign out</button>
    //   </BodyWrapper>
    //   <Footer />
    // </>
    <>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
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
            />
            <ProfileDescription
              description={profile.description}
              nickname={profile.nickname}
              cuisine={profile.cuisine}
              onChange={handleChange}
            />
            <ProfileContacts handleSignOut={handleSignOut} onUpdateProfile={handleProfileUpdate} />
            {/* <button onClick={handleSignOut}>Sign out</button> */}
          </StyledForm>
        </ProfileWrapper>
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default ProfilePage;
