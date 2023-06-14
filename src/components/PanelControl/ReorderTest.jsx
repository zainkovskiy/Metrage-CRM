import React, { useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { PanelButton } from 'ui/PanelButton';

const PanelControlDrag2Style = styled(motion.aside)`
  grpath-area: panel;
  background-color: ${({ theme }) => theme.color.secondary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 52px;
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

const ReorderTest = () => {
  const [items, setItems] = useState(initialButtons)
  const y = useMotionValue(0);

  return (
    // <PanelControlDrag2Style
    //   whileHover={{
    //     'min-width': '200px',
    //   }}
    // >
    <Reorder.Group axis="y" values={items} onReorder={setItems} style={{ y }}>
      {items.map((item) => (
        <Reorder.Item
          key={item}
          value={item}
          id={item}
        >
          <span>{item}</span>
          {/* <PanelButton icon={item} path={item} title={buttonsTitle[item]} /> */}
        </Reorder.Item>
      ))}
    </Reorder.Group>
    // <LineStyle />
    // </PanelControlDrag2Style>
  )
}

const initialButtons = [
  "todo",
  "calendar",
  "users",
  "home",
  "list",
  "deal",
  "mortgage",
  "grade",
  "lawyer",
  "insurance",
  "chart",
  "hr",
  "study",
];
const buttonsTitle = {
  todo: 'Задачи',
  calendar: 'Календарь',
  users: 'Пользователи',
  home: 'Объекты',
  list: 'Заявки',
  deal: 'Сделка',
  mortgage: 'Ипотека',
  grade: 'Оценка',
  lawyer: 'Заказ юриста',
  insurance: 'Страховка',
  chart: 'Аналитики',
  hr: 'Соискатели',
  study: 'Обучение',
}
export default ReorderTest;