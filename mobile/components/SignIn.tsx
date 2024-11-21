import React, { useState } from 'react'
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { SERVER_IP } from '../constants/config'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModsenIcon from '../assets/svg/modsen'

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
})

interface SignInProps {
  toggleAuthType: () => void
}

type RootStackParamList = {
  Profile: undefined
  NotFound: undefined
}

const SignIn: React.FC<SignInProps> = ({ toggleAuthType }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${SERVER_IP}/login`, values)
      await AsyncStorage.setItem('token', response.data.token)
      await AsyncStorage.setItem('nickname', response.data.nickname)
      await AsyncStorage.setItem('userId', response.data.userId.toString())
      setError('')
      navigation.navigate('Profile')
    } catch (error) {
      setError("Sorry, can't find your account")
    }
  }

  return (
    <View style={styles.signInWrapper}>
      <Text style={styles.greetings}>Welcome</Text>
      <ModsenIcon />
      <Formik
        initialValues={{ email: '', password: '' }}
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
              placeholder="Please enter your email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && (
              <Text style={[styles.errorMessage, { top: 85 }]}>
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
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesome5 name="eye-slash" size={16} color="black" />
                ) : (
                  <FontAwesome5 name="eye" size={16} color="black" />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={[styles.errorMessage, { top: 165 }]}>
                {errors.password}
              </Text>
            )}
            <TouchableOpacity
              style={styles.logInButton}
              onPress={handleSubmit as any}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
            {error && (
              <Text
                style={[
                  styles.errorMessage,
                  { top: 280, left: 49, fontSize: 16 },
                ]}
              >
                {error}
              </Text>
            )}
          </View>
        )}
      </Formik>
      <Text style={styles.signUpMessage}>
        Don't have an account?{' '}
        <Text onPress={toggleAuthType} style={styles.signUpLink}>
          Sign Up
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
    height: 70,
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
  signUpMessage: {
    fontFamily: 'PoppinsRegular',
    fontSize: 16,
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'none',
  },
})

export default SignIn
