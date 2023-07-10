import React from 'react';
// import logoUrl, { ReactComponent as Logo } from 'images/logo_white.svg';
import logoUrl, { ReactComponent as Logo } from 'images/logo.svg';
import logoSmallUrl, { ReactComponent as LogoSmall } from 'images/logo_small.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWindowSize } from 'hooks/windowSize';

// const LogoStyle = styled(Link)`
//   background-image: url(${logoFillUrl});
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: contain;
//   width: 200px;
//   height: 32px;
// `
const LogoStyle = styled(Logo)`
  min-width: fit-content;
  pointer-events: none;
  fill: ${({theme, fill}) => fill ? fill : theme.color.primary};
`
const LogoSmallStyle = styled(LogoSmall)`
  pointer-events: none;
`
const LinkStyle = styled(Link)`
  display: flex;
  ${({$window}) => $window && 'position: absolute; left: 50%; transform: translate(-50%, 0);'}
`

const LogoComponent = () => {
  const windowSize = useWindowSize();
  return (
    <LinkStyle to='/' $window={windowSize < 768}>
      {
        windowSize > 768 ? 
      <LogoStyle/> :
      <LogoSmallStyle/>
      }
    </LinkStyle>
  );
};

export default LogoComponent;
