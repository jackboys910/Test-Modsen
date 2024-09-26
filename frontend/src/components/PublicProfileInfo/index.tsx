import React from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClock4 } from 'react-icons/lu';
import { GoDotFill } from 'react-icons/go';
import calculateRelativeTime from '@utils/calculateOnline';
import { ProfileInfoWrapper, AboutWrapper, DataWrapper, StyledTime } from '@components/ProfileInfo/index.styled';
import { ImageWrapper, StyledInformation } from './index.styled';

interface IPublicProfileInfoProps {
  profilePicture: string;
  phoneNumber: string;
  location: string;
  registeredAt: string;
  lastOnline: string;
}

const PublicProfileInfo: React.FC<IPublicProfileInfoProps> = ({ profilePicture, phoneNumber, location, registeredAt, lastOnline }) => {
  const relativeLastOnline = calculateRelativeTime(lastOnline);

  return (
    <ProfileInfoWrapper>
      <ImageWrapper>
        <img src={`http://localhost:3001/assets/images/${profilePicture}`} alt='Profile' />
      </ImageWrapper>
      <AboutWrapper>
        <DataWrapper style={{ position: 'relative' }}>
          <BsTelephoneFill color='grey' style={{ position: 'absolute', top: '5px' }} />
          <StyledInformation>{phoneNumber ? phoneNumber : 'No information'}</StyledInformation>
        </DataWrapper>
        <DataWrapper style={{ position: 'relative' }}>
          <FaLocationDot color='grey' style={{ position: 'absolute', top: '5px' }} />
          <StyledInformation>{location ? location : 'No information'}</StyledInformation>
        </DataWrapper>
        <DataWrapper>
          <LuClock4 color='grey' />
          <StyledTime>Registered since: {registeredAt}</StyledTime>
        </DataWrapper>
        <DataWrapper>
          {relativeLastOnline !== 'Online' ? <GoDotFill color='grey' /> : <GoDotFill color='green' />}
          <StyledTime>{relativeLastOnline !== 'Online' ? 'Last online: ' + relativeLastOnline : relativeLastOnline}</StyledTime>
        </DataWrapper>
      </AboutWrapper>
    </ProfileInfoWrapper>
  );
};

export default PublicProfileInfo;