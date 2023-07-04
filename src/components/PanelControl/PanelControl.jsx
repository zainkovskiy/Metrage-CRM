import React from 'react';
import styled from 'styled-components';
import { PanelButton } from 'ui/PanelButton';
import { motion } from 'framer-motion';

export const PanelControlStyle = styled(motion.aside)`
  grpath-area: panel;
  background-color: ${({ theme }) => theme.color.secondary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 56px;
  overflow: hidden;
  z-index: 99;
`
const LineStyle = styled.span`
  margin: 0px 1rem;
  box-sizing: border-box;
  display: block;
  height: 1px;
  background-color: ${({ theme }) => theme.color.primary};
  text-align: center;
  opacity: 0.5;
`

const PanelControl = () => {
  return (
    <PanelControlStyle
      whileHover={{
        'min-width': '200px',
      }}
    >
      <div>
        <PanelButton icon='list' path='/' title='Заявки' />
        <PanelButton icon='todo' path='/task' title='Задачи' />
        <PanelButton icon='calendar' path='calendar' title='Календарь' />
        <PanelButton icon='users' path='users' title='Пользователи' />
        <PanelButton icon='home' path='home' title='Объекты' />
        <PanelButton icon='deal' path='deal' title='Сделка' />
        <PanelButton icon='mortgage' path='mortgage' title='Ипотека' />
        <PanelButton icon='grade' path='grade' title='Оценка' />
        <PanelButton icon='lawyer' path='lawyer' title='Заказ юриста' />
        <PanelButton icon='insurance' path='insurance' title='Страховка' />
        <PanelButton icon='chart' path='chart' title='Аналитики' />
        <PanelButton icon='hr' path='hr' title='Соискатели' />
        <PanelButton icon='study' path='study' title='Обучение' />
      </div>
      {/* <LineStyle /> */}
      {/* <div>
        <PanelButton icon='phone' path='phone' title='Телефония' />
        <PanelButton icon='headphone' path='headphone' title='Поддержка' />
      </div> */}
    </PanelControlStyle>
  );
};

export default PanelControl;
