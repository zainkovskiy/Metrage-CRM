import styled, { css } from "styled-components";

export const LabelStyle = styled.label`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: ${({ fullWidth, width }) => fullWidth ? '100%' : width ? width : 'auto'};
`
export const ContainerIcon = styled.div`
  position: relative;
`
export const BorderFocus = styled.span`
`
export const InputStyle = styled.input`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: ${(props) => (props.type === 'password' || props.icon) ? '0.5rem 28px 0.5rem 0.5rem' : '0.5rem'};
  border-radius: 5px;
  border: 1px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
  outline: 1px solid transparent;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: ${(props) => props.type === 'password' ? '1.25px' : ''};
  position: relative;
  &:focus + ${BorderFocus}::after{
    content: "";
    position: absolute;
    top: 0px;
    left: 0;
    bottom: 0;
    right: 0;
    border: 2px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
    border-radius: 5px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    
  }
  // &:focus{
  //   outline: 1px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
  // }
  &:disabled{
    background-color: #eee;
    opacity: 0.8;
    border: 1px solid #ccc;
  }
`
export const ContainerInput = styled.div`

`
export const iconStyle = css`
  fill: ${({ theme }) => theme.color.primary};
  width: 24px;
  height: 24px;
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`