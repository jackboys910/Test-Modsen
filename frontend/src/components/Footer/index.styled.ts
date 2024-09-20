import styled from 'styled-components';
import { COLORS } from '../../constants/styles/mainColors';
import { resolution } from '@constants/resolutions';

const StyledFooter = styled.footer`
  background-color: ${COLORS.COLOR_MAIN_BLUE};
  width: 100%;
  height: 160px;
  margin-top: auto;

  @media (${resolution.mobile}) {
    height: 100px;
  }
`;

export default StyledFooter;
