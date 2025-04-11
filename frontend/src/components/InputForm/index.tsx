import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { StyledField, StyledError, SearchButton, FieldWrapper } from './index.styled';
import { ReactComponent as SearchIcon } from '@assets/icons/search.svg';

interface IInputFormProps {
  onSearch: (query: string) => void;
}

const InputForm: React.FC<IInputFormProps> = ({ onSearch }) => {
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    inputField: Yup.string()
      .min(3, t('error.minCharacters', { count: 3 }))
      .test('not-email', t('error.noEmailAllowed'), function (value) {
        if (value && (value.includes('@gmail.') || value.includes('@mail.') || value.includes('@mail.'))) {
          return false;
        }
        return true;
      })
      .matches(/^[a-zA-Z\s,!.'-]+$/, t('error.noSpecialCharacters'))
      .test('is-empty-or-valid', t('error.minCharacters', { count: 3 }), function (value) {
        if (!value) return true;
        return value.length >= 3;
      }),
  });

  return (
    <Formik
      initialValues={{ inputField: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const query = values.inputField.trim() ? values.inputField : 'chicken';
        onSearch(query);
      }}
    >
      {() => (
        <Form>
          <FieldWrapper>
            <StyledField name='inputField' type='text' placeholder={t('inputSearchPlaceholder')} />
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
