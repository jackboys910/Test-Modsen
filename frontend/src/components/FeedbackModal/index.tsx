import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Backdrop,
  Modal,
  TitleText,
  CloseButton,
  RatingContainer,
  RatingText,
  DescriptionText,
  RatingOption,
  DescriptionContainer,
  HorizontalLine,
  StyledTextarea,
  ErrorMessage,
  SubmitButton,
  SuccessMessage,
} from './index.styled';

const validationSchema = Yup.object({
  description: Yup.string()
    .min(5, 'Description must be at least 5 characters.')
    .max(300, 'Description cannot exceed 300 characters.')
    .required('Description is required.'),
});

interface IFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<IFeedbackModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      rating: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/submitFeedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            onClose();
          }, 5000);
        } else {
          alert('Failed to submit feedback.');
        }
      } catch (error) {
        console.error('Error submitting feedback: ', error);
      } finally {
        setIsSubmitting(false);
        resetForm();
        setSelectedRating(null);
      }
    },
  });

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      formik.resetForm();
    }
  }, [isOpen]);

  const handleRatingClick = (option: number) => {
    const newRating = selectedRating === option ? null : option;
    setSelectedRating(newRating);
    formik.setFieldValue('rating', newRating);
  };

  if (!isOpen) return null;

  return (
    <>
      <Backdrop onClick={onClose} />
      <Modal>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {!isSubmitted ? (
          <>
            <TitleText>Leave Feedback</TitleText>
            <HorizontalLine />
            <RatingContainer>
              <RatingText>Rating:</RatingText>
              {[1, 2, 3, 4, 5].map((option) => (
                <RatingOption key={option} $selected={selectedRating === option} onClick={() => handleRatingClick(option)}>
                  {option}
                </RatingOption>
              ))}
            </RatingContainer>
            <DescriptionContainer>
              <DescriptionText>Description:</DescriptionText>
              <StyledTextarea
                name='description'
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
              />
              {formik.touched.description && formik.errors.description && <ErrorMessage>{formik.errors.description}</ErrorMessage>}
            </DescriptionContainer>
            <SubmitButton
              type='button'
              onClick={formik.handleSubmit as unknown as () => void}
              disabled={isSubmitting || formik.values.description.length < 5}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </SubmitButton>
          </>
        ) : (
          <SuccessMessage>
            <p>Thank you for your feedback! 😊</p>
            <p>We will consider your suggestions to improve the site.</p>
          </SuccessMessage>
        )}
      </Modal>
    </>
  );
};

export default FeedbackModal;
