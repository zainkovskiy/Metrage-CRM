import styled from 'styled-components';

export const DashboardWindowForm = styled.form`
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 30px 0;
  border: 1px solid;
  border-color: ${({ theme }) => theme.color.primary};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 320px;
  max-width: 320px;
`;
export const DashboardWindowFormFileds = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const DashboardWindowFormInputs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DashboardWindowFormButtons = styled.div`
  display: flex;
  gap: 1rem;
`;
