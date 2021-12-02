import React, { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40px;
  height: 25px;
  z-index: 2;
  position: absolute;
  top: 1.5rem;
  right: 1rem;

  span {
    display: block;
    background-color: var(--color-heading-black);
    height: 5px;
    width: 100%;
    border-radius: 10px;
    transition: transform .5s ease-in-out, opacity .3s ease-in-out;
    transform-origin: center center;
  }

  & span:nth-child(2) {
    transition: transform .5s ease-in-out, opacity .3s .2s ease-in-out;
  }

  &.active span:nth-child(2) {
    transition: transform .5s ease-in-out, opacity .3s ease-in-out;
    opacity: 0;
  }

  &.active span:first-child {
    transform: rotate(-45deg) translateY(12px);
  }
  
  &.active span:last-child {
    transform: rotate(45deg) translateY(-13px);
  }
`;


const MenuBurger = ({ isMobile, setIsOpen }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    setIsOpen();
  }

  return (
    <>
      {isMobile && (
        <StyledButton className={isActive && 'active'} onClick={() => handleClick()} >
          <span></span>
          <span></span>
          <span></span>
        </StyledButton> )
      }
    </>
  )
}

export default MenuBurger;