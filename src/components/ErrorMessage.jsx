import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Wrapper = styled.div`
  text-align: center
`;

const Image = styled.img`
  max-width: 500px;
  width: 90%;
`;

const ErrorMessage = ({ errorMessage, errorImage }) => {
  return (
    <Wrapper>
      <Image src={errorImage} alt="Error" />
      <p>{ errorMessage }</p>
    </Wrapper>
  )
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string
};

export default ErrorMessage;



