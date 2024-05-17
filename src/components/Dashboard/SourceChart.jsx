import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { SliderTitle } from '../../styles/slider';
import SourceBarChart from './SourceBarChart';
import { setNewRange } from '../../store/dashboardSlice';
import { ButtonLink } from '../../ui/ButtonLink/ButtonLink';
import { AnimatePresence, motion } from 'framer-motion';
import { TextSpanStyle } from '../../styles/styles';

const SourceChartStyle = styled.div`
  height: 100%;
  background-color: rgb(240, 219, 245);
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0px 40px;
  display: flex;
  flex-direction: column;
  width: 300px;
  min-width: 250px;
  box-shadow: 17px -11px 8px -9px rgba(97, 179, 189, 0.2);
`;
const SourceCharts = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  flex-grow: 1;
  overflow: auto;
`;
//TODO: также есть в ChartItem вынести все в отдельный компонент
const ButtonContainer = styled.div`
  position: relative;
  width: fit-content;
`;
const ButtonList = styled(motion.div)`
  position: absolute;
  background-color: rgb(245, 245, 245);
  bottom: 0px;
  right: 0px;
  transform: translate(0, calc(100% + 1px));
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid rgb(204, 204, 204);
  width: max-content;
  z-index: 99;
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
const SourceChart = () => {
  const sources = useSelector((state) => state.dashboard.data?.sources || null);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toggleOpenList = () => {
    setOpen(!open);
  };
  const setRange = (e) => {
    dispatch(
      setNewRange({
        APIName: sources.APIName,
        range: e.target.dataset.name,
      })
    );
    setOpen(false);
  };
  return (
    <SourceChartStyle>
      <SliderTitle>
        Источники
        {sources?.rangeTitle && (
          <ButtonContainer id={sources?.APIName}>
            <ButtonLink
              size={12}
              color='#727272'
              onClick={toggleOpenList}
              id={sources?.APIName}
            >
              {sources?.rangeTitle || ''}
            </ButtonLink>
            <AnimatePresence>
              {open && (
                <ButtonList
                  id={sources?.APIName}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <ButtonListItem
                    size='12'
                    color='#727272'
                    id={sources?.APIName}
                    onClick={setRange}
                    data-name='currentMonth'
                  >
                    Текущий месяц
                  </ButtonListItem>
                  <ButtonListItem
                    size='12'
                    color='#727272'
                    id={sources?.APIName}
                    onClick={setRange}
                    data-name='currentWeek'
                  >
                    Текущая неделя
                  </ButtonListItem>
                  <ButtonListItem
                    size='12'
                    color='#727272'
                    id={sources?.APIName}
                    onClick={setRange}
                    data-name='lastMonth'
                  >
                    Прошлый месяц
                  </ButtonListItem>
                  <ButtonListItem
                    size='12'
                    color='#727272'
                    id={sources?.APIName}
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
      </SliderTitle>
      <SourceCharts>
        {sources?.data &&
          sources.data.map((bar) => (
            <SourceBarChart
              key={bar.name}
              barData={[bar]}
              chartName={bar.name}
            />
          ))}
      </SourceCharts>
    </SourceChartStyle>
  );
};

export default SourceChart;
