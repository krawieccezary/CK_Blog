import React from 'react';
import Spinner from 'react-spinkit';
import styled from 'styled-components';


const StyledSpinnerWrapp = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const LoadingSpinner = () => (
  <StyledSpinnerWrapp>
    <Spinner name="ball-scale-multiple" color="var(--color-primary)" />
  </StyledSpinnerWrapp>
);

export default LoadingSpinner;