import { styled, createGlobalStyle } from 'styled-components';
import InterRegular from '@assets/fonts/Inter/Regular/Inter_18pt-Regular.ttf';
import InterMedium from '@assets/fonts/Inter/Medium/Inter_18pt-Medium.ttf';
import InterBold from '@assets/fonts/Inter/Bold/Inter_18pt-Bold.ttf';
import InterLight from '@assets/fonts/Inter/Light/Inter_18pt-Light.ttf';
import RobotoRegular from '@assets/fonts/Roboto/Regular/Roboto-Regular.ttf';
import SpaceGroteskMedium from '@assets/fonts/SpaceGrotesk/Medium/SpaceGrotesk-Medium.ttf';
import PoppinsRegular from '@assets/fonts/Poppins/Regular/Poppins-Regular.ttf';
import PoppinsMedium from '@assets/fonts/Poppins/Medium/Poppins-Medium.ttf';
import PlayfairDisplayMedium from '@assets/fonts/PlayfairDisplay/Medium/PlayfairDisplay-Medium.ttf';
import PlayfairDisplayBold from '@assets/fonts/PlayfairDisplay/Bold/PlayfairDisplay-Bold.ttf';

export const GlobalStyles = createGlobalStyle`
body, html, #root {
margin: 0;
padding: 0;
height: 100%;
}

* {
box-sizing: border-box;
}

@font-face {
  font-family: 'InterRegular';
  src: url(${InterRegular});
}

@font-face {
  font-family: 'InterMedium';
  src: url(${InterMedium});
}

@font-face {
  font-family: 'InterBold';
  src: url(${InterBold});
}

@font-face {
  font-family: 'InterLight';
  src: url(${InterLight});
}

@font-face {
  font-family: 'RobotoRegular';
  src: url(${RobotoRegular});
}

@font-face {
  font-family: 'SpaceGroteskMedium';
  src: url(${SpaceGroteskMedium});
}

@font-face {
  font-family: 'PoppinsRegular';
  src: url(${PoppinsRegular});
}

@font-face {
  font-family: 'PoppinsMedium';
  src: url(${PoppinsMedium});
}

@font-face {
  font-family: 'PlayfairDisplayMedium';
  src: url(${PlayfairDisplayMedium});
}

@font-face {
  font-family: 'PlayfairDisplayBold';
  src: url(${PlayfairDisplayBold});
}
`;

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
