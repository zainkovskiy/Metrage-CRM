import React from 'react';
import loaderUrl, { ReactComponent as LoaderIcon } from 'images/loader.svg';
import styled from 'styled-components';

const LoaderStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`
const LoaderIconStyle = styled(LoaderIcon)`
  width: 60px;
  height: 60px;
  fill: ${({theme, fill}) => fill ? fill : theme.color.primary};
`
const Loader = ({fill}) => {
  return (
    <LoaderStyle>
      <LoaderIconStyle fill={fill}/>
    </LoaderStyle>
  );
};

export default Loader;