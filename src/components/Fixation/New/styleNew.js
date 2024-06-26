import styled, { css } from 'styled-components';
import { device } from 'styles/device';

export const NewFixation = styled.form`
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  overflow: auto;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;
export const TextAreaStyle = styled.textarea`
  border-radius: 5px;
  padding: 0.3rem;
  resize: none;
  font-family: ${({ theme }) => theme.font.family};
  border: 1px solid ${({ theme }) => theme.color.primary};
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `};
  width: 100%;
  box-sizing: border-box;
  outline: 1px solid transparent;
  transition: outline 0.3s;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.primary};
  }
  &:disabled {
    background-color: rgb(238, 238, 238);
    opacity: 0.8;
    border: 1px solid rgb(204, 204, 204);
  }
`;
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  @media ${device.tablet} {
    grid-template-columns: 1fr;
  }
`;
export const PhoneTextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${({ $success }) => ($success ? '#98D892' : '#C6D892')};
  border-radius: 5px;
`;
