import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';

import { useEmail } from '../composables/use-email';


const FormField = styled.div`
  margin-bottom: 1rem;
`;

const FormValidateInfo = styled.small`
  color: var(--color-accent);
  display: block;
  margin-top: 0.5rem;
`;

const message_animation = keyframes`
  from {
    transform: translateY(10%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SubmittingMessage = styled.span`
  display: block;
  margin: 2rem 0;
  padding: 1.5rem 2rem;
  color: var(--color-white);
  animation: ${message_animation} .7s ease-in-out both;
  
  &.success {
    background-color: var(--color-success);
  }

  &.error {
    background-color: var(--color-error);
  }
  
  a {
    color: var(--white);
    text-decoration: none;
  }
`;


const SpanHoneyPot = styled.input`
  visibility: hidden;
  height: 0;
`;

const ContactForm = ({ onSuccess, setUserName }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submittingMessage, setSubmittingMessage] = useState({status: null, message: null});
  const [isSpan, setIsSpan] = useState(false);
  const { send } = useEmail();

  const onSubmit = async data => {
    if(isSpan){
      return;
    }

    setSubmitting(true);
    setSubmittingMessage({status: null, message: null});
    const { email: email_address, message, name } = data;
    setUserName(name);

    const errorMessage = `Uups! Coś poszło nie tak! Spróbuj ponownie później lub wyślij wiadomość na <a href='mailto:web@cezarykrawiec.pl'>web@cezarykrawiec.pl</a>`;
  
    const emailMessage = `
      Nadawca: ${name}
      E-mail: ${email_address}

      Wiadomość: ${message}
    `;

    try {
      const response = await send(emailMessage)

      if (!response.ok) {
        setSubmitting(false);
        setSubmittingMessage({status: 'error', message: errorMessage});

        return;
      }

      setSubmitting(false);
      onSuccess();
      reset();

    } catch (error) {
      setSubmitting(false);
      setSubmittingMessage({status: 'error', message: errorMessage});
    };
  }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <FormField>
        <input type="text" {...register('name', { required: true })} placeholder="Imię"/>
        {errors.name && <FormValidateInfo>Imię jest wymagane</FormValidateInfo>}
      </FormField>
      <FormField>
        <input type="email" {...register('email', { required: true })} placeholder="E-mail"/>
        {errors.email && <FormValidateInfo>Email jest wymagany</FormValidateInfo>}
      </FormField>
      <FormField>
        <textarea name="message" {...register('message', { required: true })} placeholder="Wiadomość"></textarea>
        {errors.message && <FormValidateInfo>Wiadomość jest wymagana</FormValidateInfo>}
      </FormField>
      <SpanHoneyPot type="checkbox" name="question" value="1" onClick={() => setIsSpan(true)}/>
      <input className="button" type="submit" value="Wyślij" disabled={submitting} />
      {submittingMessage.message && (
        <SubmittingMessage 
          className={`submitting-message ${submittingMessage.status}`}
          dangerouslySetInnerHTML={{ __html: submittingMessage.message}}
        />
      )}
    </form>
  )
}

export default ContactForm;