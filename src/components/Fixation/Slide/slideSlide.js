import styled from 'styled-components';
import { SliderBlock } from '../../../styles/slider';
import { Link } from 'react-router-dom';

export const SliderFixationForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  @media (max-width: 1170px) {
    grid-template-columns: 1fr;
  }
`;
export const FixationBlock = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const AvatarImage = styled.img`
  height: 48px;
  width: 48px;
  min-width: 48px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 50px;
  object-position: top;
`;
export const SliderAgent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgb(249, 245, 245);
  padding: 0.5rem;
  border-radius: 5px;
  box-sizing: border-box;
  width: 100%;
`;
export const SlideFixationStatusSend = styled.div`
  position: absolute;
  width: 200px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(128, 128, 128) 0px 2px 15px 2px;
  border-radius: 5px;
  top: 24px;
  left: -50%;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 99;
  &::after {
    position: absolute;
    content: '';
    bottom: 100%;
    right: 5rem;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0px 10px 9px;
    border-color: transparent transparent rgb(255, 255, 255);
  }
`;
export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #85009e;
`;
export const SlideFixationDeveloper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
`;
export const SlideFixationJKImage = styled.img`
  border-radius: 5px;
  width: 35%;
  /* min-width: 35%; */
  object-fit: cover;
  height: 60px;
  max-width: 100px;
`;
export const LinkTo = styled(Link)`
  font-family: 'CeraCY', sans-serif;
  font-size: 12px;
  text-decoration: none;
  color: #000;
  /* color: ${({ theme }) => theme.color.primary}; */
  &:hover {
    text-decoration: underline;
  }
`;
