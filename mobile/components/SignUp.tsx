import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { SERVER_IP } from '../constants/config'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import ModsenIcon from '../assets/svg/modsen'

const bannedWords = ['fuck', 'bastard', 'bitch']
const reservedNames = ['saved', 'messages']

const validationSchema = Yup.object({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.-]+@(gmail\.com|mail\.ru|inbox\.ru|bk\.ru|list\.ru|internet\.ru|xmail\.ru|yandex\.ru|yahoo\.com|hotmail\.com|outlook\.com)$/,
      'Invalid email address'
    )
    .required('Required'),
  password: Yup.string().required('Required'),
  copyPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
  nickname: Yup.string()
    .matches(
      /^[a-zA-Z0-9.,\-: ]+$/,
      'Nickname can only contain letters, numbers, dots, commas, hyphens, and colons.'
    )
    .max(15, 'Nickname cannot exceed 15 characters')
    .test(
      'no-banned-words',
      'Nickname contains inappropriate language',
      (value) =>
        value
          ? !bannedWords.some((word) => value.toLowerCase().includes(word))
          : true
    )
    .test('no-banned-words', 'Reserved name', (value) =>
      value
        ? !reservedNames.some((word) => value.toLowerCase().includes(word))
        : true
    )
    .required('Required'),
})

interface SignUpProps {
  toggleAuthType: () => void
}

interface FormValues {
  email: string
  password: string
  copyPassword: string
  nickname: string
}

const SignUp: React.FC<SignUpProps> = ({ toggleAuthType }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showCopyPassword, setShowCopyPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await fetch(`${SERVER_IP}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      setError('')
      setSuccess('Registration successful!')
      resetForm()
      setTimeout(() => toggleAuthType(), 2000)
    } catch (error: any) {
      if (error.response?.status === 409) {
        setError('Email or nickname already registered')
      } else {
        setError('Registration failed')
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <View style={styles.signInWrapper}>
      <Text style={styles.greetings}>Welcome</Text>
      <ModsenIcon style={styles.iconWrapper} />
      <Formik
        initialValues={{
          nickname: '',
          email: '',
          password: '',
          copyPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              style={styles.styledField}
              placeholder="Please enter your nickname"
              onChangeText={handleChange('nickname')}
              onBlur={handleBlur('nickname')}
              value={values.nickname}
            />
            {errors.nickname && touched.nickname && (
              <Text style={[styles.errorMessage, { top: 85 }]}>
                {errors.nickname}
              </Text>
            )}
            <TextInput
              style={styles.styledField}
              placeholder="Please enter your email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={[styles.errorMessage, { top: 165 }]}>
                {errors.email}
              </Text>
            )}
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.styledField}
                placeholder="Please enter your password"
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <FontAwesome5 name="eye-slash" size={16} color="black" />
                ) : (
                  <FontAwesome5 name="eye" size={16} color="black" />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={[styles.errorMessage, { top: 245 }]}>
                {errors.password}
              </Text>
            )}
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.styledField}
                placeholder="Please enter your password again"
                secureTextEntry={!showCopyPassword}
                onChangeText={handleChange('copyPassword')}
                onBlur={handleBlur('copyPassword')}
                value={values.copyPassword}
              />
              <TouchableOpacity
                onPress={() => setShowCopyPassword(!showCopyPassword)}
                style={styles.eyeIcon}
              >
                {showCopyPassword ? (
                  <FontAwesome5 name="eye-slash" size={16} color="black" />
                ) : (
                  <FontAwesome5 name="eye" size={16} color="black" />
                )}
              </TouchableOpacity>
            </View>
            {errors.copyPassword && touched.copyPassword && (
              <Text style={[styles.errorMessage, { top: 325 }]}>
                {errors.copyPassword}
              </Text>
            )}
            <TouchableOpacity
              style={styles.logInButton}
              onPress={handleSubmit as any}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorMessage}>{error}</Text>}
            {success && <Text style={styles.successMessage}>{success}</Text>}
          </View>
        )}
      </Formik>
      <Text style={styles.signUpMessage}>
        Already have an account?{' '}
        <Text onPress={toggleAuthType} style={styles.signUpLink}>
          Log In
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  signInWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  greetings: {
    fontFamily: 'PoppinsMedium',
    fontWeight: 600,
    fontSize: 30,
    lineHeight: 1.2,
    marginBottom: 40,
  },
  iconWrapper: {
    height: 50,
    marginBottom: -5,
  },
  styledField: {
    fontFamily: 'PoppinsRegular',
    height: 40,
    width: 300,
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'grey',
  },
  eyeIcon: {
    position: 'absolute',
    right: 5,
    bottom: 12,
  },
  passwordWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: 'red',
    position: 'absolute',
  },
  logInButton: {
    backgroundColor: '#800080',
    marginVertical: 50,
    marginHorizontal: 'auto',
    textAlign: 'center',
    width: 300,
    height: 50,
    paddingTop: 15,
    paddingHorizontal: 20,
    borderWidth: 0,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'RobotoRegular',
    textAlign: 'center',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 20,
  },
  successMessage: {
    fontFamily: 'PoppinsRegular',
    fontSize: 15,
    textAlign: 'center',
    color: 'green',
    paddingBottom: 15,
  },
  signUpMessage: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'none',
  },
})

export default SignUp
