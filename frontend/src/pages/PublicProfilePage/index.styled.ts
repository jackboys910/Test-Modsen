import styled from 'styled-components';

export const StyledContainer = styled.div`
  display: flex;
  height: 100%;
  gap: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 5px;
    align-items: center;
  }
`;
