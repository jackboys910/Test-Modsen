import React, { useRef } from 'react';
import {
  ProfileInfoWrapper,
  ImageWrapper,
  CameraIcon,
  HiddenFileInput,
  AboutWrapper,
  DataWrapper,
  StyledInfoInput,
  StyledTime,
} from './index.styled';
import { FaCamera } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClock4 } from 'react-icons/lu';
import { GoDotFill } from 'react-icons/go';

interface ProfileInfoProps {
  profilePicture: string;
  phoneNumber: string;
  location: string;
  registeredAt: string;
  lastOnline: string;
  onChange: (field: string, value: any) => void;
  onFileChange: (file: File) => void;
  pictureErrorMessage: string | null;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profilePicture,
  phoneNumber,
  location,
  registeredAt,
  lastOnline,
  onChange,
  onFileChange,
  pictureErrorMessage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <ProfileInfoWrapper>
      <ImageWrapper onClick={handleFileClick}>
        <img src={`http://localhost:3001/assets/images/${profilePicture}`} alt='Profile' />
        <CameraIcon>
          <FaCamera color='white' size={24} />
        </CameraIcon>
        <HiddenFileInput ref={fileInputRef} type='file' name='profilePicture' accept='image/*' onChange={handleFileChange} />
      </ImageWrapper>
      {/* <input type='file' name='profilePicture' accept='image/*' onChange={handleFileChange} /> */}
      {pictureErrorMessage && <p>{pictureErrorMessage}</p>}
      <AboutWrapper>
        <DataWrapper>
          <BsTelephoneFill color='grey' />
          <StyledInfoInput
            type='text'
            name='phoneNumber'
            value={phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            placeholder='Phone number'
          />
        </DataWrapper>
        <DataWrapper>
          <FaLocationDot color='grey' />
          <StyledInfoInput
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange('location', e.target.value)}
            placeholder='Location'
          />
        </DataWrapper>
        <DataWrapper>
          <LuClock4 color='grey' />
          <StyledTime>Registered since: {registeredAt}</StyledTime>
        </DataWrapper>
        <DataWrapper>
          {lastOnline !== 'Online' ? <GoDotFill color='grey' /> : <GoDotFill color='green' />}
          <StyledTime>{lastOnline !== 'Online' ? 'Last online: ' + lastOnline : lastOnline}</StyledTime>
        </DataWrapper>
      </AboutWrapper>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
