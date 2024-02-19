import React from 'react';
import { useSelector } from 'react-redux';
import { TextSpanStyle } from '../../styles/styles';
import styled from 'styled-components';
import { useNumberTriad } from '../../hooks/StringHook';
import { TooltipUI } from 'ui/TooltipUI';
import { useNavigate } from 'react-router-dom';

const ChartInfoStyle = styled.div`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  display: grid;
  gap: 0.5rem;
`;
const ChartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  background-color: rgb(239, 219, 245);
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
`;
const ChartInfoList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  width: 100%;
`;
const ChartInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  ${({ $isButton }) => $isButton && 'cursor: pointer'};
  transition: transform 0.3s;
  &:hover {
    ${({ $isButton }) => $isButton && 'transform: scale(1.1)'};
  }
  &:active {
    ${({ $isButton }) => $isButton && 'transform: scale(0.9)'};
  }
`;
const ChartMiniLabel = styled(TextSpanStyle)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, -20%);
`;
const ChartInfo = () => {
  const dashboard = useSelector((state) => state.dashboard.data);
  const navigate = useNavigate();
  const handleClickDemand = (filter) => {
    navigate('/application', { state: { ...filter } });
  };
  return (
    <ChartInfoStyle>
      <ChartInfoContainer>
        <TextSpanStyle>Сделки тек. месяц</TextSpanStyle>
        <ChartInfoList>
          {dashboard.dealShort.data.map((item) => (
            <TooltipUI title={item.hint || ''} maxWidth={250} key={item.title}>
              <ChartInfoItem>
                <TextSpanStyle bold color='#84019e' size={16}>
                  {useNumberTriad(item.cost)}&#8381;
                </TextSpanStyle>
                <TextSpanStyle nowrap size={10}>
                  {item.title}
                  {(item.count || item.count === 0) && `: ${item.count}`}
                </TextSpanStyle>
              </ChartInfoItem>
            </TooltipUI>
          ))}
        </ChartInfoList>
      </ChartInfoContainer>
      <ChartInfoContainer>
        <TextSpanStyle>Заявки тек. месяц</TextSpanStyle>
        <ChartInfoList>
          {dashboard.demandShort.data.map((item) => (
            <TooltipUI title={item.hint || ''} maxWidth={250} key={item.title}>
              <ChartInfoItem
                onClick={() => {
                  handleClickDemand(item.filter);
                }}
                $isButton={Boolean(item?.filter)}
              >
                <div style={{ position: 'relative' }}>
                  <TextSpanStyle bold color='#84019e' size={16}>
                    {item.count}
                  </TextSpanStyle>
                  {item?.miniLabel?.visible && (
                    <ChartMiniLabel color={item?.miniLabel?.color} size={10}>
                      {item?.miniLabel?.value}
                    </ChartMiniLabel>
                  )}
                </div>
                <TextSpanStyle nowrap size={10}>
                  {item.title}
                </TextSpanStyle>
              </ChartInfoItem>
            </TooltipUI>
          ))}
        </ChartInfoList>
      </ChartInfoContainer>
    </ChartInfoStyle>
  );
};

export default ChartInfo;
