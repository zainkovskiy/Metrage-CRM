import styled from 'styled-components';

export const ApplicationBlockStyle = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  gap: ${({ gap }) => gap || '0.5rem;'};
  justify-content: ${({ jc }) => jc || 'center'};
  align-items: ${({ ai }) => ai || 'center'};
  ${({ $column }) => $column && 'flex-direction: column'};
`;
export const ApplicationSlideSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => (gap ? gap : '0.5rem')};
  width: 100%;
`;
