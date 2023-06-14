import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PanelControlDrag2Style = styled(motion.aside)`
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
const PanelControlDrag2 = () => {
  const [icons, setIcons] = useState(initialIcons);
  const positions = useRef([]).current;
  const setPositions = (idx, offset) => {
    positions[idx] = offset;
  }
  const moveItem = (idx, dragOffset) => {
    const targetItem = findItem(idx, dragOffset);
    // const remove = positions.splice(1, 1);
    // console.log(remove);
    if (targetItem !== idx) {
      // console.log('icons');
      // console.log(icons);
      //что то не так
      const testIcon = JSON.parse(JSON.stringify(icons));
      const item1 = icons[idx];
      testIcon[idx] = testIcon[targetItem];
      testIcon[targetItem] = item1;
      setIcons(testIcon);
      // console.log('testIcon');
      console.log(testIcon);
    };
  }
  const findItem = (idx, dragOffset) => {
    if (dragOffset > positions[idx].top) {
      const nextElem = positions[idx + 1];
      if (nextElem) {
        const nextElemCenter = nextElem.top + (nextElem.height / 2);
        if (dragOffset >= nextElemCenter) {
          return idx + 1;
        }
        return idx;
      } else {
        return idx;
      }
    } else {
      const prevElem = positions[idx - 1];
      if (prevElem) {
        if (prevElem) {
          const prevElemCenter = prevElem.top + (prevElem.height / 2);
          if (dragOffset <= prevElemCenter) {
            return idx - 1
          }
          return idx;
        } else {
          return idx;
        }
      } else {
        return idx;
      }
    }
  }
  return (
    <PanelControlDrag2Style
      whileHover={{
        'min-width': '200px',
      }}
    >
      <motion.div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {
          icons.map((item, idx) =>
            <Item
              key={idx}
              item={item}
              setPositions={setPositions}
              moveItem={moveItem}
              idx={idx}
            />)
        }
      </motion.div>
    </PanelControlDrag2Style>
  );
};
const variants = {
  drag: {
    zIndex: 99,
  },
  noDrag: {
    zIndex: 0,
  }
}
const Item = ({ item, setPositions, idx, moveItem }) => {
  const itemRef = useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  useEffect(() => {
    const { top, height } = itemRef.current.getBoundingClientRect();
    setPositions(idx, { top: top, height: height })
  })
  return (
    <motion.p
      ref={itemRef}
      drag='y'
      dragElastic={1}
      dragConstraints={{ top: 0, bottom: 0 }}
      onDragStart={() => setIsDrag(true)}
      onDragEnd={() => setIsDrag(false)}
      onDrag={(e, { point }) => moveItem(idx, point.y)}
      style={{ background: '#e2e2e2' }}
      animate={isDrag ? 'drag' : 'noDrag'}
      variants={variants}
      initial='noDrag'
    >{item.icon}</motion.p>
  )
}
const initialIcons = [
  {
    icon: 'todo',
    title: 'Задачи',
  },
  {
    icon: 'calendar',
    title: 'Календарь',
  },
  {
    icon: 'users',
    title: 'Пользователи',
  }
]

export default PanelControlDrag2;