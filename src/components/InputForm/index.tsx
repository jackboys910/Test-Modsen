import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledField, StyledError, SearchButton, FieldWrapper } from './index.styled';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const validationSchema = Yup.object({
  inputField: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .test('not-email', 'Email addresses are not allowed', function (value) {
      if (value && (value.includes('@gmail.') || value.includes('@mail.') || value.includes('@mail.'))) {
        return false;
      }
      return true;
    })
    .matches(/^[a-zA-Z\s,!.'-]+$/, 'Special characters are not allowed')
    .test('is-empty-or-valid', 'Must be at least 3 characters', function (value) {
      if (!value) return true;
      return value.length >= 3;
    }),
});

interface IInputFormProps {
  onSearch: (query: string) => void;
}

const InputForm: React.FC<IInputFormProps> = ({ onSearch }) => {
  return (
    <Formik
      initialValues={{ inputField: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        onSearch(values.inputField);
      }}
    >
      {() => (
        <Form>
          <FieldWrapper>
            <StyledField name='inputField' type='text' placeholder='Search Your Favorite Food' />
            <SearchButton type='submit'>
              <SearchIcon />
            </SearchButton>
            <StyledError>
              <ErrorMessage name='inputField' />
            </StyledError>
          </FieldWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default InputForm;
