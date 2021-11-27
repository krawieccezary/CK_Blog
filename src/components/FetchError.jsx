import React from 'react';
import PropTypes from 'prop-types';
import errorImage from '../images/fetch-error.png';

const FetchError = ({ errorMessage }) => {
  return (
    <div>
      <img src={errorImage} alt="Error" />
      <p>{errorMessage}</p>
    </div>
  )
}

FetchError.propTypes = {
  errorMessage: PropTypes.string
};

export default FetchError;



