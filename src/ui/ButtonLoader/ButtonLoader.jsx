import { motion } from 'framer-motion';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotation = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const Spiner = styled.span`
  width: 18px;
  height: 18px;
  border: 3px solid ${({ theme }) => theme.color.primary};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
const ButtonLoaderStyle = styled(motion.button)`
  border-radius: 5px;
  padding: ${({ size }) =>
    size === 'small' ? '0.2rem 0.5rem' : '0.5rem 1rem'};
  font-family: CeraCY, sans-serif;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  transition: color 0.3s, background-color 0.3s, border 0.3s;
  white-space: nowrap;
  background-color: #ffffff;
  color: #85009e;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  text-align: center;
  border: none;
  min-width: ${({ $width }) => $width && $width + 'px'};
  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
  @media (hover: none) {
    &:active {
      background-color: #c587cf;
      color: #ffffff;
    }
  }
  @media (hover: hover) {
    &:hover {
      background-color: #c587cf;
      color: #ffffff;
    }
    &:active {
      background-color: #ffffff;
      color: #85009e;
    }
  }
`;

const ButtonLoader = ({ children, size, fullWidth, loading, onClick }) => {
  const buttonRef = React.useRef(null);
  const [width, setWidth] = React.useState(null);
  React.useEffect(() => {
    if (buttonRef?.current) {
      setWidth(buttonRef?.current?.offsetWidth);
    }
  }, []);
  return (
    <ButtonLoaderStyle
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      disabled={loading}
      ref={buttonRef}
      $width={width}
      $fullWidth={fullWidth}
      onClick={onClick}
    >
      {loading ? <Spiner /> : <>{children}</>}
    </ButtonLoaderStyle>
  );
};

export default ButtonLoader;
