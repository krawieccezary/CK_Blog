import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled, { keyframes } from 'styled-components';


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

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [submittingMessage, setSubmittingMessage] = useState({status: null, message: null});
  const [isSpan, setIsSpan] = useState(false);

  const onSubmit = async data => {
    if(!isSpan){
      setSubmitting(true);
      setSubmittingMessage({status: null, message: null});
      const { email, message: body, name } = data;
  
      const errorMessage = `Oops! Something gone wrong! Maybe try later or send message to <a href='mailto:web@cezarykrawiec.pl'>web@cezarykrawiec.pl</a>`;
   
      try {
        const response = await fetch(process.env.GATSBY_EMAIL_FUNCTION_URL, {
          method: "post",
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
          body: new URLSearchParams({ email, name, body }).toString(),
        })
  
        if (response.status === 200) {
          setSubmitting(false);
          setSubmittingMessage({status: 'success', message: `${name}, thanks for the message! I will response soon.`});
          reset();
          
        } else {
          setSubmitting(false);
          setSubmittingMessage({status: 'error', message: errorMessage});
        }
  
      } catch (error) {
        setSubmitting(false);
        setSubmittingMessage({status: 'error', message: errorMessage});
      };
    }

  }



  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      method="post"
    >
      <FormField>
        <input type="text" {...register('name', { required: true })} placeholder="Name"/>
        {errors.name && <FormValidateInfo>Name is require</FormValidateInfo>}
      </FormField>
      <FormField>
        <input type="email" {...register('email', { required: true })} placeholder="Email"/>
        {errors.email && <FormValidateInfo>Email is require</FormValidateInfo>}
      </FormField>
      <FormField>
        <textarea name="message" {...register('message', { required: true })} placeholder="Message"></textarea>
        {errors.message && <FormValidateInfo>Message is require</FormValidateInfo>}
      </FormField>
      <SpanHoneyPot type="checkbox" name="question" value="1" onClick={() => setIsSpan(true)}/>
      <input className="button" type="submit" value="Send" disabled={submitting} />
      {submittingMessage.message && <SubmittingMessage className={submittingMessage.status} dangerouslySetInnerHTML={{ __html: submittingMessage.message}}></SubmittingMessage>}
    </form>
  )
}

export default ContactForm;