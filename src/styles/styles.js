import styled from "styled-components";

export const MainContainer = styled.div`
  position: relative;
  flex-grow: 1;
  padding-left: ${({ $isExternal }) =>  $isExternal ? '0' : '52px'};
  display: flex;
  max-height: calc(100vh - 61.09px);
`
export const SimpleFormStyle = styled.form`
  min-width: 400px;
  max-width: 400px;
  background-color: ${({ theme }) => theme.color.secondary};
  border-radius: 0px 100px; 
  display: flex;
  flex-direction: column;
  padding: 100px 2rem;
  box-sizing: border-box;
  gap: 1rem;
`

export const TitleFormStyle = styled.h2`
  text-align: ${({ ta }) => ta};
  font-family: CeraCY, sans-serif;
  color: ${({ theme, color }) => theme.color[color || 'primary']};
`
const defaultSize = 14;
export const TextSpanStyle = styled.span`
  display: block;
  font-family: CeraCY, sans-serif;
  color: ${({ color }) => color || '#000000'};
  font-size: ${({ size }) => (size || defaultSize) + 'px'};
  height: ${({ height }) => height + 'px'};
  font-weight: ${({ weight }) => weight || 400};
  white-space: ${({ nowrap }) => nowrap && 'nowrap'};
  // @media(max-width: 748px){
  //   font-size: ${({ size }) => ((size || defaultSize) - 4) + 'px'};
  // }
`