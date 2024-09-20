import React from 'react';
import { Spinner, SpinnerWrapper } from './index.styled';

const Loader: React.FC = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default Loader;
