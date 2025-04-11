import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCamera } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClock4 } from 'react-icons/lu';
import { GoDotFill } from 'react-icons/go';
import {
  ProfileInfoWrapper,
  ImageWrapper,
  CameraIcon,
  HiddenFileInput,
  AboutWrapper,
  DataWrapper,
  StyledInfoInput,
  QuestionIcon,
  Tooltip,
  StyledTime,
} from './index.styled';

interface ProfileInfoProps {
  profilePicture: string;
  phoneNumber: string;
  location: string;
  registeredAt: string;
  lastOnline: string;
  onChange: (field: string, value: any) => void;
  onFileChange: (file: File) => void;
  pictureErrorMessage: string | null;
  errors: {
    phoneNumber: boolean;
    location: boolean;
  };
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
  errors,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showTooltip, setShowTooltip] = useState<{ [key: string]: boolean }>({
    phoneNumber: false,
    location: false,
  });
  const { t, i18n } = useTranslation();

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  const toggleTooltip = (field: string) => {
    setShowTooltip((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <ProfileInfoWrapper>
      <ImageWrapper onClick={handleFileClick}>
        <img src={`http://localhost:3001/assets/images/${profilePicture}`} alt='Profile' />
        <CameraIcon>
          <FaCamera color='grey' size={24} />
        </CameraIcon>
        <HiddenFileInput ref={fileInputRef} type='file' name='profilePicture' accept='image/*' onChange={handleFileChange} />
      </ImageWrapper>
      {/* <input type='file' name='profilePicture' accept='image/*' onChange={handleFileChange} /> */}
      {pictureErrorMessage && <p>{pictureErrorMessage}</p>}
      <AboutWrapper>
        <DataWrapper style={{ position: 'relative' }}>
          <BsTelephoneFill color='grey' style={{ position: 'absolute', top: '5px' }} />
          <StyledInfoInput
            type='text'
            name='phoneNumber'
            value={phoneNumber}
            onChange={(e) => onChange('phoneNumber', e.target.value)}
            placeholder={t('phoneNumber')}
            style={{ border: errors.phoneNumber ? '2px solid red' : undefined }}
          />
          <QuestionIcon
            size={14}
            lang={i18n.language}
            onMouseEnter={() => setShowTooltip({ ...showTooltip, phoneNumber: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, phoneNumber: false })}
            onClick={() => toggleTooltip('phoneNumber')}
            style={{ color: errors.phoneNumber ? 'green' : 'grey' }}
          />
          {showTooltip.phoneNumber && <Tooltip>{t('phoneNumberDescription')}</Tooltip>}
        </DataWrapper>
        <DataWrapper style={{ position: 'relative' }}>
          <FaLocationDot color='grey' style={{ position: 'absolute', top: '5px' }} />
          <StyledInfoInput
            type='text'
            name='location'
            value={location}
            onChange={(e) => onChange('location', e.target.value)}
            placeholder={t('location')}
            style={{ border: errors.location ? '2px solid red' : undefined }}
          />
          <QuestionIcon
            size={14}
            lang={i18n.language}
            onMouseEnter={() => setShowTooltip({ ...showTooltip, location: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, location: false })}
            onClick={() => toggleTooltip('location')}
            style={{ color: errors.location ? 'green' : 'grey' }}
          />
          {showTooltip.location && <Tooltip>{t('locationDescription')}</Tooltip>}
        </DataWrapper>
        <DataWrapper>
          <LuClock4 color='grey' />
          <StyledTime>
            {t('registeredSince')}
            {registeredAt}
          </StyledTime>
        </DataWrapper>
        <DataWrapper>
          {lastOnline !== 'Online' ? <GoDotFill color='grey' /> : <GoDotFill color='green' />}
          <StyledTime>{lastOnline !== 'Online' ? t('offline') + lastOnline : t('online')}</StyledTime>
        </DataWrapper>
      </AboutWrapper>
    </ProfileInfoWrapper>
  );
};

export default ProfileInfo;
