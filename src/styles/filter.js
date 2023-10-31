import styled from 'styled-components';

export const FilterFormStyle = styled.form`
  height: 100%;
  border-radius: 5px;
  background-color: #fff;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
`;
export const FilterFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  flex-grow: 1;
`;
export const FilterTitle = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  width: 100%;
  text-align: center;
`;
