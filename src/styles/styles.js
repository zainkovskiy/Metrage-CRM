import styled from 'styled-components';
import { device } from './device';

export const MainContainer = styled.div`
  position: relative;
  flex-grow: 1;
  padding-left: ${({ $isExternal }) => ($isExternal ? '0' : '56px')};
  display: flex;
  max-height: calc(100vh - 50.3px);
  @media ${device.tablet} {
    padding: 0;
    height: ${document.documentElement.clientHeight - 42}px;
  }
`;
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
`;

export const TitleFormStyle = styled.h2`
  text-align: ${({ ta }) => ta};
  font-family: CeraCY, sans-serif;
  color: ${({ theme, color }) => theme.color[color || 'primary']};
`;
const defaultSize = 14;
export const TextSpanStyle = styled.span`
  display: block;
  font-family: ${({ bold }) => (bold ? 'CeraCYBold' : 'CeraCY')}, sans-serif;
  color: ${({ color }) => color || '#000000'};
  font-size: ${({ size }) => (size || defaultSize) + 'px'};
  height: ${({ height }) => height + 'px'};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  white-space: ${({ nowrap }) => nowrap && 'nowrap'};
  text-align: ${({ align }) => align && align};
  ${({ lHeight }) => lHeight && `line-height: ${lHeight}px`};
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'};
  // @media(max-width: 748px){
  //   font-size: ${({ size }) => (size || defaultSize) - 4 + 'px'};
  // }
`;
