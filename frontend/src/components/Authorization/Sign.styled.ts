import styled from 'styled-components';
import { ErrorMessage, Field } from 'formik';

export const SignInWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Greetings = styled.h2`
  font-family: PoppinsMedium;
  font-weight: 600;
  font-size: 30px;
  line-height: 1.2;
  margin-bottom: 18px;
`;

export const IconWrapper = styled.div`
  height: 70px;
  margin-bottom: -5px;
`;

export const StyledField = styled(Field)`
  font-family: 'PoppinsRegular';
  height: 40px;
  width: 300px;
  margin-top: 40px;
  border: 0;
  border-bottom: 1px solid black;
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const ToggleButton = styled.button`
  position: absolute;
  right: 0;
  top: 20px;
  height: 100%;
  background: none;
  border: none;
  cursor: pointer;
`;

export const LogInButton = styled.button`
  background: linear-gradient(to right, #00f, #0f0);
  display: block;
  margin: 0 auto;
  margin: 65px 0 60px;
  text-align: center;
  font-family: 'RobotoRegular';
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: white;
  width: 300px;
  height: 50px;
  background: linear-gradient(to right, #00f, #800080);
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

export const StyledErrorMessageWrapper = styled.div`
  position: relative;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  font-size: 14px;
  color: red;
  margin-top: 5px;
  position: absolute;
`;

export const SignUpMessage = styled.p`
  font-family: 'PoppinsRegular';
`;
