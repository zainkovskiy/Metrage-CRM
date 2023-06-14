import styled from "styled-components";

export const TaskBlockStyle = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  gap: ${({ gap }) => gap || '0.5rem;'};
  justify-content: ${({ jc }) => jc || 'center'};
  align-items: ${({ ai }) => ai || 'center'}; 
  ${({ $column }) => $column && 'flex-direction: column'};
`
export const TaskSlideTitleStyle = styled.div`
  border-bottom: 1px solid #e2e2e2;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ size }) => size ? size + 'px' : '14px'};
  width: 100%;
  color: ${({ color }) => color && color};
`
export const TaskSlideSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({gap}) => gap ? gap : '0.5rem'};
  width: 100%;
`