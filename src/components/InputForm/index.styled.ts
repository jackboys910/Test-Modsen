import styled from 'styled-components';
import { Field } from 'formik';
import { COLORS } from '../../constants/styles/mainColors';

export const StyledField = styled(Field)`
  height: 76px;
  width: 1280px;
  padding: 12px 16px 12px 32px;
  border: 1px solid ${COLORS.COLOR_STROKE_ORANGE};
  border-radius: 48px;
  box-sizing: border-box;
  margin-left: 303px;
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
  }
`;

export const StyledError = styled.div`
  color: red;
  font-size: 20px;
  position: absolute;
  left: 0;
  margin: 4px 0 0 330px;
  height: 22px;
  overflow: hidden;
  pointer-events: none;
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 20px;
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
`;

export const FieldWrapper = styled.div`
  position: relative;
  width: 1583px;
`;
