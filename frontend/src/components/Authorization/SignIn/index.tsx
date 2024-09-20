import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
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
import { StyledCantFind } from './index.styled';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '@utils/firebaseConfig';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

interface SignInProps {
  toggleAuthType: () => void;
}

interface FormValues {
  email: string;
  password: string;
}

const SignIn: React.FC<SignInProps> = ({ toggleAuthType }) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      const response = await axios.post('http://localhost:3001/login', values);
      localStorage.setItem('token', response.data.token);
      setError('');
      resetForm();
      navigate('/profile');
    } catch (error: any) {
      setError("Sorry, can't find your account");
    }
    setSubmitting(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleTogglePassword = () => {
  //   setShowPassword(!showPassword)
  // }

  // const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://localhost:3001/login', { email, password });
  //     localStorage.setItem('token', response.data.token);
  //     setError('');
  //     setEmail('');
  //     setPassword('');
  //   } catch (error: any) {
  //     setError("Sorry, can't find your account");
  //   }
  // signInWithEmailAndPassword(auth, email, password)
  //   .then((user) => {
  //     console.log(user);
  //     setError('');
  //     setEmail('');
  //     setPassword('');
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     setError("Sorry, can't find your account");
  //   });
  // };

  return (
    <SignInWrapper>
      <Greetings>Welcome</Greetings>
      <IconWrapper>
        <ModsenIcon />
      </IconWrapper>
      <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
            <LogInButton type='submit' disabled={isSubmitting}>
              Log in
            </LogInButton>
            {error && <StyledCantFind>{error}</StyledCantFind>}
          </Form>
        )}
      </Formik>
      <SignUpMessage>
        Don't have an account?{' '}
        <span onClick={toggleAuthType} style={{ cursor: 'pointer', color: 'blue' }}>
          Sign Up
        </span>
      </SignUpMessage>
    </SignInWrapper>
    // <div>
    //   <form onSubmit={logIn}>
    //     <h2>Log in</h2>
    //     <input placeholder='Please enter your email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' />
    //     <input placeholder='Please enter your password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
    //     <button type='submit'>Log in</button>
    //     {error && <p>Error</p>}
    //   </form>
    // </div>
  );
};

export default SignIn;
