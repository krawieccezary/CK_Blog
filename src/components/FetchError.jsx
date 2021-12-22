import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import errorImage from '../images/fetch-error.png';


const Wrapper = styled.div`
  text-align: center
`;
const Image = styled.img`
  max-width: 500px;
`;

const FetchError = ({ errorMessage }) => {
  return (
    <Wrapper>
      <Image src={errorImage} alt="Error" />
      <p>Houston, we have a problem! Come back later.</p>
    </Wrapper>
  )
}

FetchError.propTypes = {
  errorMessage: PropTypes.string
};

export default FetchError;



