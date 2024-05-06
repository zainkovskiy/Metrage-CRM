import React from 'react';
import styled from 'styled-components';
import { PanelButton } from 'ui/PanelButton';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export const PanelControlStyle = styled(motion.aside)`
  background-color: ${({ theme }) => theme.color.secondary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 1rem;
  left: 0;
  bottom: 1rem;
  width: 56px;
  overflow: hidden;
  z-index: 99;
  gap: 1rem;
  opacity: 0.7;
  border-radius: 5px;
  @media print {
    display: none;
  }
`;
const LineStyle = styled.span`
  margin: 0px 1rem;
  box-sizing: border-box;
  display: block;
  height: 1px;
  background-color: ${({ theme }) => theme.color.primary};
  text-align: center;
  opacity: 0.5;
`;

const PanelControl = () => {
  const { ddsRights } = useSelector((state) => state.user);
  return (
    <PanelControlStyle
      whileHover={{
        'min-width': '200px',
        opacity: 1,
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <PanelButton icon='application' path='application' title='Заявки' />
        <PanelButton icon='objects' path='objects' title='Объекты' />
        <PanelButton icon='deal' path='deal' title='Сделка' />
        <PanelButton icon='compilation' path='compilation' title='Подборки' />
        <PanelButton icon='client' path='client' title='Клиенты' />
        <PanelButton icon='users' path='users' title='Пользователи' />
        <PanelButton icon='task' path='task' title='Задачи' />
        <PanelButton icon='news' path='news' title='Новости' />
        <PanelButton icon='residential' path='builder' title='Застройщики' />
        <PanelButton icon='residential' path='residential' title='ЖК/БЦ' />
        <PanelButton icon='planning' path='planning' title='План' />
        <PanelButton icon='mortgage' path='mortage' title='Ипотека' />
        {ddsRights && <PanelButton icon='close' path='dds' title='ДДС' />}
        {/* <PanelButton icon='planning' path='calendar' title='Calendar' /> */}
        {/* <PanelButton icon='chart' path='/' title='Аналитики' /> */}
        {/* <PanelButton icon='calendar' path='calendar' title='Календарь' />
        <PanelButton icon='home' path='home' title='Объекты' />
        <PanelButton icon='mortgage' path='mortgage' title='Ипотека' />
        <PanelButton icon='grade' path='grade' title='Оценка' />
        <PanelButton icon='lawyer' path='lawyer' title='Заказ юриста' />
        <PanelButton icon='insurance' path='insurance' title='Страховка' />
        <PanelButton icon='hr' path='hr' title='Соискатели' />
        <PanelButton icon='study' path='study' title='Обучение' /> */}
      </div>
      <LineStyle />
      <PanelButton
        icon='mail'
        title='Почта'
        blank
        href='http://crm.metragegroup.com/mail'
        tagName='a'
      />
      {/* <div>
        <PanelButton icon='phone' path='phone' title='Телефония' />
        <PanelButton icon='headphone' path='headphone' title='Поддержка' />
      </div> */}
    </PanelControlStyle>
  );
};

export default PanelControl;
