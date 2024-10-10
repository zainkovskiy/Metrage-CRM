import styled from 'styled-components';

export const Indicator = styled.div`
  & > span {
    display: block;
    transition: color 0.3s, transform 0.3s;
  }
`;

export const IndicatorText = styled.div`
  cursor: pointer;
  &:hover > ${Indicator} > span {
    color: #85009e;
    transform: scale(1.1) translate(5px, 0);
  }
`;
export const IndicatorTextDots = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const IndicatorTextDotsTwoLine = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
