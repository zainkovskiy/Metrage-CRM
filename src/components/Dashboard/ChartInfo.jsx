import React from 'react';
import { useSelector } from 'react-redux';
import { TextSpanStyle } from '../../styles/styles';
import styled from 'styled-components';
import { useNumberTriad } from '../../hooks/StringHook';

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
`;
const ChartMiniLabel = styled(TextSpanStyle)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(100%, -20%);
`;
const ChartInfo = () => {
  const dashboard = useSelector((state) => state.dashboard.data);
  return (
    <ChartInfoStyle>
      <ChartInfoContainer>
        <TextSpanStyle>Сделки</TextSpanStyle>
        <ChartInfoList>
          {dashboard.dealShort.data.map((item) => (
            <ChartInfoItem key={item.title}>
              <TextSpanStyle bold color='#84019e' size={16}>
                {useNumberTriad(item.cost)}&#8381;
              </TextSpanStyle>
              <TextSpanStyle nowrap size={10}>
                {item.title}
              </TextSpanStyle>
            </ChartInfoItem>
          ))}
        </ChartInfoList>
      </ChartInfoContainer>
      <ChartInfoContainer>
        <TextSpanStyle>Заявки</TextSpanStyle>
        <ChartInfoList>
          {dashboard.demandShort.data.map((item) => (
            <ChartInfoItem key={item.title}>
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
          ))}
        </ChartInfoList>
      </ChartInfoContainer>
    </ChartInfoStyle>
  );
};

export default ChartInfo;
