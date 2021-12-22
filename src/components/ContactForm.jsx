import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';


const FormField = styled.div`
  margin-bottom: 1rem;
`;

const FormValidateInfo = styled.small`
  color: var(--color-accent);
  display: block;
  margin-top: 0.5rem;
`;

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        {errors.message && <FormValidateInfo>This field is require</FormValidateInfo>}
      </FormField>
      <input className="button" type="submit" value="Send" />
    </form>
  )
}

export default ContactForm;