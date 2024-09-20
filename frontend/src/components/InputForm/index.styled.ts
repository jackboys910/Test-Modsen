import styled from 'styled-components';
import { Field } from 'formik';
import { COLORS } from '../../constants/styles/mainColors';
import { resolution } from '@constants/resolutions';

export const StyledField = styled(Field)`
  height: 76px;
  width: 66%;
  padding: 12px 16px 12px 32px;
  border: 1px solid ${COLORS.COLOR_STROKE_ORANGE};
  border-radius: 48px;
  box-sizing: border-box;
  margin-left: 17vw;
  font-family: 'InterMedium';
  color: ${COLORS.COLOR_INPUT_GREY};
  font-weight: 500;
  font-size: 24px;
  line-height: 29.05px;
  letter-spacing: 0.05em;

  &::placeholder {
    font-family: 'InterMedium';
    color: ${COLORS.COLOR_INPUT_GREY};
    font-weight: 500;
    font-size: 24px;
    line-height: 29.05px;
    letter-spacing: 0.05em;
    width: 1047px;
    height: 29px;

    @media (${resolution.laptop}) {
      font-size: 20px;
    }

    @media (max-width: 550px) {
      font-size: 16px;
    }

    @media (max-width: 420px) {
      font-size: 15px;
    }
  }

  @media (${resolution.laptop}) {
    font-size: 20px;
  }

  @media (${resolution.mobile}) {
    margin-left: 10vw;
    margin-top: 81px;
    width: 80vw;

    line-height: 16.94px;
  }

  @media (max-width: 550px) {
    font-size: 16px;
    margin-left: 20px;
    width: 90vw;
  }

  @media (max-width: 420px) {
    font-size: 14px;
  }
`;

export const StyledError = styled.div`
  color: red;
  font-size: 20px;
  position: absolute;
  left: 0;
  margin: 4px 0 0 18vw;
  height: 22px;
  overflow: hidden;
  pointer-events: none;

  @media (${resolution.mobile}) {
    margin-left: 10vw;
    font-size: 15px;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 18vw;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  padding: 0;

  svg {
    width: 28px;
    fill: ${COLORS.COLOR_ICON_GREY};
  }

  @media (${resolution.mobile}) {
    top: 76%;
    right: 10vw;
  }

  @media (max-width: 550px) {
    right: 4vw;
  }
`;

export const FieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;
