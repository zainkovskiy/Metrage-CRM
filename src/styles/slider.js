import styled from "styled-components";

export const SliderStyle = styled.div`
  height: 100%;
  display: flex;
  gap: 0.5rem;
`;
export const SliderContext = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
  @media (min-width > 768) {
    min-width: 450px;
  }
`;
export const SliderBlock = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
`

export const SliderTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`