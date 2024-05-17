import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ChartItem from './ChartItem';
import DashboardNews from './DashboardNews';
import ChartInfo from './ChartInfo';
import ChartObjectFilter from './ChartObjectFilter';

const ChartsStyle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`;
const ChartItemsWrap = styled.div`
  width: 100%;
  display: flex;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  display: grid;
  grid-auto-rows: min-content;
  gap: 0.5rem;
`;
const ChartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`;
const Charts = () => {
  const dashboard = useSelector((state) => state.dashboard.data);
  return (
    <ChartsStyle>
      <ChartInfo />
      <ChartItems>
        <ChartItemsWrap>
          {/* {dashboard?.news?.length > 0 && (
          <DashboardNews news={dashboard?.news || []} />
        )} */}
          {/* <ChartItem chart={dashboard?.clients || null} /> */}
          {/* <ChartItem chart={dashboard?.demands || null} /> */}
          {/* <ChartItem chart={dashboard?.sources || null} /> */}
          {/* <ChartItem chart={dashboard?.dealsProfit || null} /> */}
          <ChartItem chart={dashboard?.dealDinamics || null} />
          <ChartItem chart={dashboard?.demandDinamics || null} />
          <ChartItem
            chart={dashboard?.dealsOffices || null}
            filter={
              <ChartObjectFilter chartName={dashboard?.dealsOffices?.APIName} />
            }
          />
          <ChartItem chart={dashboard?.objects || null} />
          <ChartItem chart={dashboard?.mortgage || null} />
          <ChartItem chart={dashboard?.RankDeals || null} />
          <ChartItem chart={dashboard?.AdvExponation || null} />
          <ChartItem chart={dashboard?.AdvStruct || null} />
        </ChartItemsWrap>
      </ChartItems>
    </ChartsStyle>
  );
};

export default Charts;
