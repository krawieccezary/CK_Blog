import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Message = styled.p`
  margin-top: 30px;
`;

const ErrorMessage = ({ errorMessage, children }) => {
  return (
    <Wrapper>
      {children}
      <Message>{ errorMessage }</Message>
    </Wrapper>
  )
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string
};

export default ErrorMessage;



