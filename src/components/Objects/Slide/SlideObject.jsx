import React from 'react';
import styled from 'styled-components';
const SlideObjectStyle = styled.div`
  display: flex;
  height: 100%;
  gap: 0.5rem;
`
const SlideObjectContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768){
    min-width: 450px;
  }
`
const SlideObjectStoryStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  width: 25%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
`

const SlideObject = () => {
  return (
    <SlideObjectStyle>
      <SlideObjectContentStyle/>
      <SlideObjectStoryStyle/>
    </SlideObjectStyle>
  );
};

export default SlideObject;