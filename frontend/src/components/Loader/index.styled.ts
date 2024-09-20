import styled from 'styled-components';
import { COLORS } from '../../constants/styles/mainColors';

export const Spinner = styled.div`
  border: 4px solid ${COLORS.COLOR_SPINNER_WHITE};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: ${COLORS.COLOR_SPINNER_TWIST_BLUE};
  animation: spin 1s linear infinite;
  margin: 20px auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const SpinnerWrapper = styled.div`
  height: 2434px;
`;
