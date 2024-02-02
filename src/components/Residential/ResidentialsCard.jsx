import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import imgErrorUrl from 'images/img-error.svg';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const ResidentialStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75);
    }
  }
`;
const ResidentialHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${({ $isBuild }) => ($isBuild ? '#6ecd4c' : '#d9d9d9')};
  width: 100%;
  box-sizing: border-box;
`;
const ResidentialImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
const ResidentialFooter = styled.div`
  background-color: #d9d9d9;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
  flex-grow: 1;
`;
const ResidentialContent = styled.div`
  position: relative;
`;
const ResidentialIsBuild = styled(TextSpanStyle)`
  position: absolute;
  padding: 0 0.2rem;
  border-radius: 5px;
  background-color: #6ecd4c;
  top: 0.5rem;
  left: 0.5rem;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const ResidentialsCard = ({ residential }) => {
  return (
    <LinkStyle to={`${residential?.UID}`}>
      <ResidentialStyle variants={variants} initial='hidden' animate='visible'>
        <ResidentialHeader $isBuild={residential.isBuild}>
          <TextSpanStyle size={10}>{residential?.JKType} </TextSpanStyle>
          <TextSpanStyle size={12}>{residential?.name} </TextSpanStyle>
        </ResidentialHeader>
        <ResidentialContent>
          <ResidentialImage src={residential?.picture || imgErrorUrl} />
          {residential?.isBuild && (
            <ResidentialIsBuild size={10}>Сдан</ResidentialIsBuild>
          )}
        </ResidentialContent>
        <ResidentialFooter>
          <TextSpanStyle size={12}>{residential?.addrStr}</TextSpanStyle>
          <TextSpanStyle size={10}>
            Вариантов: {residential?.countAppartment || 0}
          </TextSpanStyle>
        </ResidentialFooter>
      </ResidentialStyle>
    </LinkStyle>
  );
};

export default ResidentialsCard;
