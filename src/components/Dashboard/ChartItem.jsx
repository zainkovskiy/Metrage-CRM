import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChartArea from './ChartArea';
import ChartSankey from './ChartSankey';
import ChartPie from './ChartPie';
import ChartDoublePie from './ChartDoublePie';
import ChartTable from './ChartTable';
import DefaultChartComponent from './DefaultChartComponent';
import { TextSpanStyle } from '../../styles/styles';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setNewRange } from '../../store/dashboardSlice';

const ChartItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 40px 0 40px 0;
`;
const TextSpanStyleBorder = styled(TextSpanStyle)`
  border-bottom: 1px solid black;
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
const ChartItem = ({ chart }) => {
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
      case 'AreaChart':
        return ChartArea;
      case 'doublePieChart':
        return ChartDoublePie;
      case 'rTable':
        return ChartTable;
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
  return (
    <ChartItemStyle>
      <TextSpanStyleBorder align='end'>
        {chart?.title || ''}
      </TextSpanStyleBorder>
      <ChartComponent
        chart={chart?.data || null}
        header={chart?.header || null}
      />
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
              </ButtonList>
            )}
          </AnimatePresence>
        </ButtonContainer>
      )}
    </ChartItemStyle>
  );
};
export default ChartItem;
