import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ReactComponent as ModsenIcon } from '@assets/icons/modsen.svg';
import {
  SignInWrapper,
  Greetings,
  IconWrapper,
  StyledField,
  PasswordWrapper,
  ToggleButton,
  LogInButton,
  StyledErrorMessageWrapper,
  StyledErrorMessage,
  SignUpMessage,
} from '../Sign.styled';
import { SuccessMessage, ErrorMessage } from './index.styled';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
  copyPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
});

interface SignUpProps {
  toggleAuthType: () => void;
}

interface FormValues {
  email: string;
  password: string;
  copyPassword: string;
}

const SignUp: React.FC<SignUpProps> = ({ toggleAuthType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCopyPassword, setShowCopyPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      await axios.post('http://localhost:3001/register', {
        email: values.email,
        password: values.password,
      });
      setError('');
      setSuccess('Registration successful!');
      resetForm();
      setTimeout(() => toggleAuthType(), 2000);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setError('Email already registered');
      } else {
        setError('Registration failed');
      }
    }
    setSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCopyPasswordVisibility = () => {
    setShowCopyPassword(!showCopyPassword);
  };

  return (
    <SignInWrapper>
      <Greetings>Welcome</Greetings>
      <IconWrapper>
        <ModsenIcon />
      </IconWrapper>
      <Formik initialValues={{ email: '', password: '', copyPassword: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <StyledField type='email' name='email' placeholder='Please enter your email' />
              <StyledErrorMessageWrapper>
                <StyledErrorMessage name='email' component='div' />
              </StyledErrorMessageWrapper>
            </div>
            <PasswordWrapper>
              <StyledField type={showPassword ? 'text' : 'password'} name='password' placeholder='Please enter your password' />
              <ToggleButton type='button' onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </ToggleButton>
            </PasswordWrapper>
            <StyledErrorMessageWrapper>
              <StyledErrorMessage name='password' component='div' />
            </StyledErrorMessageWrapper>
            <PasswordWrapper>
              <StyledField
                type={showCopyPassword ? 'text' : 'password'}
                name='copyPassword'
                placeholder='Please enter your password again'
              />
              <ToggleButton type='button' onClick={toggleCopyPasswordVisibility}>
                {showCopyPassword ? <FaEyeSlash /> : <FaEye />}
              </ToggleButton>
              <StyledErrorMessageWrapper>
                <StyledErrorMessage name='copyPassword' component='div' />
              </StyledErrorMessageWrapper>
            </PasswordWrapper>
            <LogInButton type='submit' disabled={isSubmitting}>
              Create account
            </LogInButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {success && (
              <SuccessMessage>
                {success}
                <br />
                Redirecting to login page...
              </SuccessMessage>
            )}
          </Form>
        )}
      </Formik>
      <SignUpMessage>
        Already have an account?{' '}
        <span onClick={toggleAuthType} style={{ cursor: 'pointer', color: 'blue' }}>
          Log In
        </span>
      </SignUpMessage>
    </SignInWrapper>
  );
};

export default SignUp;
