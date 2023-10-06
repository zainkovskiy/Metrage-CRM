import styled, { css } from 'styled-components';

export const LabelStyle = styled.label`
  font-size: ${({ labelSize }) => (labelSize ? labelSize + 'px' : '14px')};
  font-family: CeraCY, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: ${({ fullWidth, width }) =>
    fullWidth ? '100%' : width ? width : 'auto'};
  ${({ hidden }) => hidden && 'visibility: hidden'};
`;
export const ContainerIcon = styled.div`
  position: relative;
  border-radius: 6px;
  border: 1px solid transparent;
  &:has(input:focus) {
    border: 1px solid
      ${({ theme, error }) => (error ? 'red' : theme.color.primary)};
  }
`;
const getInputPadding = (props) => {
  const { type, icon, $small } = props;
  if (type === 'password' || icon) {
    return '0.5rem 28px 0.5rem 0.5rem';
  }
  return $small ? '0.2rem 0.5rem' : '0.5rem';
  // (props) => (props.type === 'password' || props.icon) ? '0.5rem 28px 0.5rem 0.5rem' : '0.5rem'
};
export const InputStyle = styled.input`
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: ${(props) => getInputPadding(props)};
  border-radius: 5px;
  border: 1px solid
    ${({ theme, error }) => (error ? 'red' : theme.color.primary)};
  outline: none;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: ${(props) => (props.type === 'password' ? '1.25px' : '')};
  position: relative;
  // -webkit-appearance: none;
  &:disabled {
    background-color: #eee;
    opacity: 0.8;
    border: 1px solid #ccc;
  }
`;
export const ContainerInput = styled.div``;
export const iconStyle = css`
  fill: ${({ theme }) => theme.color.primary};
  width: 24px;
  height: 24px;
  position: absolute;
  right: 2px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
`;
