import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const Content = styled.p`
  margin-top: 30px;
`;

const Message = ({ content, children }) => {
  return (
    <Wrapper>
      {children}
      <Content>{ content }</Content>
    </Wrapper>
  )
}

Message.propTypes = {
  content: PropTypes.string
};

export default Message;



