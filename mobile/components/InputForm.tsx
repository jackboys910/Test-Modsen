import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import SearchIcon from '../assets/svg/search'
import { COLORS } from '../constants/styles/mainColors'

const validationSchema = Yup.object({
  inputField: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .test('not-email', 'Email addresses are not allowed', (value) => {
      if (value && (value.includes('@gmail.') || value.includes('@mail.'))) {
        return false
      }
      return true
    })
    .matches(/^[a-zA-Z\s,!.'-]+$/, 'Special characters are not allowed')
    .test('is-empty-or-valid', 'Must be at least 3 characters', (value) => {
      if (!value) return true
      return value.length >= 3
    }),
})

interface IInputFormProps {
  onSearch: (query: string) => void
}

const InputForm: React.FC<IInputFormProps> = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ inputField: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const query = values.inputField.trim() ? values.inputField : 'chicken'
        onSearch(query)
      }}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.fieldWrapper}>
          <TextInput
            style={styles.inputField}
            onChangeText={handleChange('inputField')}
            value={values.inputField}
            placeholder="Search Your Favorite Food"
          />
          <TouchableOpacity
            onPress={() => handleSubmit()}
            style={styles.searchButton}
          >
            <SearchIcon width={28} height={28} />
          </TouchableOpacity>
          {errors.inputField && (
            <Text style={styles.errorText}>{errors.inputField}</Text>
          )}
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  inputField: {
    marginTop: 90,
    height: 76,
    width: 360,
    padding: 12,
    paddingLeft: 30,
    paddingRight: 55,
    borderColor: COLORS.COLOR_STROKE_ORANGE,
    borderWidth: 1,
    borderRadius: 48,
    color: COLORS.COLOR_INPUT_GREY,
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 17,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    position: 'absolute',
    left: 43,
    top: 165,
    marginTop: 4,
  },
  searchButton: {
    position: 'absolute',
    right: 20,
    top: 134,
    transform: [{ translateY: -20 }],
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldWrapper: {
    position: 'relative',
    width: '100%',
  },
})

export default InputForm
