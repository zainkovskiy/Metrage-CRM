import React from 'react';
import logoUrl, { ReactComponent as Logo } from 'images/logo_white.svg';
import logoFillUrl, { ReactComponent as LogoFill } from 'images/logo_fill.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoStyle = styled(Link)`
  background-image: url(${logoFillUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 200px;
  height: 32px;
`

const LogoCompomemt = () => {
  return (
    <LogoStyle to='/'/>
  );
};

export default LogoCompomemt;
