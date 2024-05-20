import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChartArea from './ChartArea';
import ChartSankey from './ChartSankey';
import ChartPie from './ChartPie';
import ChartDoublePie from './ChartDoublePie';
import ChartTable from './ChartTable';
import ChartTableRank from './ChartTableRank';
import DefaultChartComponent from './DefaultChartComponent';
import { TextSpanStyle } from '../../styles/styles';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';
import { LinkUI } from 'ui/LinkUI';
import { Box } from 'ui/Box';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setNewRange } from '../../store/dashboardSlice';
import { SliderTitle } from '../../styles/slider';
import ChartDoubleRadar from './ChartDoubleRadar';
import ChartBar from './ChartBar';
import ChartTwoPie from './ChartTwoPie';
import { getChartIconComponent } from './ChartIcons';

const ChartItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: rgb(202 235 239 / 45%);
  box-shadow: -8px 12px 57px -9px rgba(187, 44, 212, 0.13);
  border-radius: 5px;
`;
const ChartItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px solid rgb(120, 100, 100);
  box-sizing: border-box;
`;
const ButtonContainer = styled.div`
  position: relative;
  width: fit-content;
`;
const ButtonList = styled(motion.div)`
  position: absolute;
  background-color: rgb(245, 245, 245);
  bottom: 0px;
  right: 0px;
  transform: translate(calc(100% + 0.5rem), 0);
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid rgb(204, 204, 204);
  width: max-content;
`;
const ButtonListItem = styled(TextSpanStyle)`
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const ChartItem = ({ chart, filter }) => {
  if (!chart || !chart?.visible) {
    return;
  }
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   addEventListener('click', handleClickButtonList);
  //   return () => {
  //     removeEventListener('click', handleClickButtonList);
  //   };
  // }, []);
  const handleClickButtonList = (e) => {
    if (e.target.id !== chart.APIName && open) {
      setOpen(false);
    }
  };
  const getChartComponent = () => {
    if (chart?.data?.length === 0) {
      return DefaultChartComponent;
    }
    switch (chart?.graphName) {
      case 'PieChart':
        return ChartPie;
      case 'SankeyChart':
        return ChartSankey;
      case 'BarChart':
        return ChartBar;
      case 'AreaChart':
        return ChartArea;
      case 'doublePieChart':
        return ChartTwoPie;
      // case 'doublePieChart':
      //   return ChartDoublePie;
      case 'rTable':
        return ChartTable;
      case 'TableRank':
        return ChartTableRank;
      // case 'doubleRadarChart':
      //   return ChartDoubleRadar;
      default:
        return DefaultChartComponent;
    }
  };
  const toggleOpenList = () => {
    setOpen(!open);
  };
  const setRange = (e) => {
    dispatch(
      setNewRange({
        APIName: chart.APIName,
        range: e.target.dataset.name,
      })
    );
    setOpen(false);
  };
  const ChartComponent = getChartComponent();
  const ChartIconComponent = getChartIconComponent(chart.APIName);
  return (
    <ChartItemStyle>
      <ChartItemHeader>
        <ChartIconComponent />
        <Box fullWidth jc='flex-end'>
          <TextSpanStyle size={16} color='rgb(120, 100, 100)'>
            {chart?.title || ''}
          </TextSpanStyle>
        </Box>
      </ChartItemHeader>
      {filter && filter}
      <ChartComponent
        chart={chart?.data || null}
        header={chart?.header || null}
      />
      <Box jc='space-between'>
        {chart?.rangeTitle && (
          <ButtonContainer id={chart?.APIName}>
            <ButtonLink
              size={12}
              color='#727272'
              onClick={toggleOpenList}
              id={chart?.APIName}
            >
              {chart?.rangeTitle || ''}
            </ButtonLink>
            <AnimatePresence>
              {open && (
                <ButtonList
                  id={chart?.APIName}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  {chart?.listIndex ? (
                    chart.listIndex.map((button) => (
                      <ButtonListItem
                        key={button.nameApi}
                        size='12'
                        color='#727272'
                        id={button.nameApi}
                        onClick={setRange}
                        data-name={button.title}
                      >
                        {button.title}
                      </ButtonListItem>
                    ))
                  ) : (
                    <>
                      <ButtonListItem
                        size='12'
                        color='#727272'
                        id={chart?.APIName}
                        onClick={setRange}
                        data-name='currentMonth'
                      >
                        Текущий месяц
                      </ButtonListItem>
                      <ButtonListItem
                        size='12'
                        color='#727272'
                        id={chart?.APIName}
                        onClick={setRange}
                        data-name='currentWeek'
                      >
                        Текущая неделя
                      </ButtonListItem>
                      <ButtonListItem
                        size='12'
                        color='#727272'
                        id={chart?.APIName}
                        onClick={setRange}
                        data-name='lastMonth'
                      >
                        Прошлый месяц
                      </ButtonListItem>
                      <ButtonListItem
                        size='12'
                        color='#727272'
                        id={chart?.APIName}
                        onClick={setRange}
                        data-name='lastWeek'
                      >
                        Прошлая неделя
                      </ButtonListItem>
                    </>
                  )}
                </ButtonList>
              )}
            </AnimatePresence>
          </ButtonContainer>
        )}
        {chart?.URL && (
          <LinkUI href={chart.URL} download={true} size={12}>
            Скачать отчет
          </LinkUI>
        )}
      </Box>
    </ChartItemStyle>
  );
};
export default ChartItem;
