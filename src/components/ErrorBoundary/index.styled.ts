import styled from 'styled-components';
import { COLORS } from '@constants/styles/mainColors';

export const ErrorText = styled.h2`
  color: ${COLORS.COLOR_ERRORBOUNDARY_TEXT_ORANGE};
  background-color: ${COLORS.COLOR_ERRORBOUNDARY_BACKGROUND_RED};
  border: 1px solid ${COLORS.COLOR_ERRORBOUNDARY_BORDER_RED};
  border-radius: 8px;
  text-align: center;
  padding: 20px;
  font-size: 24px;
`;
