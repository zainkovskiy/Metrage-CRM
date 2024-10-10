import React from 'react';
import * as S from './style';
import { IDashboardGraph, IGraphDefault } from '../type';
import TextUI from '../../../uiTs/TextUI';
import ButtonLink from '../../../uiTs/ButtonLink';
import DashboardGraphBar from '../DashboardGraphBar';
import DashboardGraphDoughnut from '../DashboardGraphDoughnut';

const DashboardGraph = (props: IDashboardGraph<IGraphDefault>) => {
  const { titleComponent, excelURI, graphs } = props;

  const getChartComponent = () => {
    if (graphs?.typeChart === 'bar') return DashboardGraphBar;
    if (graphs?.typeChart === 'doughnut') return DashboardGraphDoughnut;
    return () => {
      return <></>;
    };
  };
  const ChartComponent = getChartComponent();
  return (
    <S.DashboardGraph>
      <TextUI size={16} bold>
        {titleComponent}
      </TextUI>
      <S.DashboardGraphContainer>
        <ChartComponent {...graphs} />
      </S.DashboardGraphContainer>
      {excelURI && (
        <ButtonLink size={12} color='grey' href={excelURI} download>
          Скачать в Excel
        </ButtonLink>
      )}
    </S.DashboardGraph>
  );
};

export default DashboardGraph;
