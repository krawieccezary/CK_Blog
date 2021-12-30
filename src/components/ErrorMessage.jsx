import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const ErrorMessage = ({ errorMessage, children }) => {
  return (
    <Wrapper>
      {children}
      <p>{ errorMessage }</p>
    </Wrapper>
  )
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string
};

export default ErrorMessage;



