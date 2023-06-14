import React from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from 'framer-motion';

export const PanelControlDragStyle = styled(motion.aside)`
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

const PanelControlDrag = () => {
  const [iconList, setIconList] = React.useState(initialIcons);
  const positions = React.useRef([]).current;
  const setPoition = (idx, offset) => (positions[idx] = offset);
  const moveItem = (idx, dragOffset) => {
    const targetIndex = findIndex(idx, dragOffset, positions);
    // console.log(targetIndex);
    // if (targetIndex !== i) setColors(move(colors, i, targetIndex));
  };
  return (
    <PanelControlDragStyle
      whileHover={{
        'min-width': '200px',
      }}
    >
      {
        iconList.map((item, idx) =>
          <Item
            key={idx}
            idx={idx}
            item={item}
            setPoition={setPoition}
            moveItem={moveItem}
          />
        )
      }
    </PanelControlDragStyle>
  );
};
const findIndex = (idx, yOffset, positions) => {
  let target = idx;
  const { top, height } = positions[idx];
  const bottom = top + height;
  console.log(yOffset);
}
const Item = ({ item, idx, setPoition, moveItem }) => {
  const [isDragging, setDragging] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    setPoition(idx, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });
  // const dragOriginY = useMotionValue(0);
  return (
    <motion.p
      initial={false}
      ref={ref}
      // dragOriginY={dragOriginY}
      animate={isDragging ? onTop : flat}
      drag="y"
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDrag={(e, { point }) => moveItem(idx, point.y)}
    >{item.title}</motion.p>
  )
}
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};
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

export default PanelControlDrag;