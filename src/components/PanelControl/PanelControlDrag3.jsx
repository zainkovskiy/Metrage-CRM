import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import styled from "styled-components";
// import { findIndex, Position } from "./find-index";
import { arrayMoveImmutable } from "array-move";
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

const Item = ({ item, setPosition, moveItem, i }) => {
  const [isDragging, setDragging] = useState(false);
  const itemRef = useRef(null);
  const y = useMotionValue(0);

  useEffect(() => {
    setPosition(i, {
      height: itemRef.current.offsetHeight,
      top: itemRef.current.offsetTop
    });
  });
  return (
    <motion.div
      ref={itemRef}
      initial={false}
      animate={isDragging ? onTop : flat}
      style={{ backgroundColor: '#15d015', padding: '1rem', border: '1px solid', y }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={() => moveItem(i, y.get())}
    >{item.icon}</motion.div>
  );
};

const DragExample = () => {
  const [icons, setIcons] = useState(initialIcons);
  const positions = useRef([]).current;
  const setPosition = (i, offset) => (positions[i] = offset);
  
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    if (targetIndex !== i) {
      setIcons(arrayMoveImmutable(icons, i, targetIndex));
    }
  };

  return (
    <PanelControlDrag2Style
      whileHover={{
        'min-width': '200px',
      }}
    >
      {icons.map((item, i) => (
        <Item
          key={i}
          i={i}
          item={item}
          setPosition={setPosition}
          moveItem={moveItem}
        />
      ))}
    </PanelControlDrag2Style>
  );
};

// Spring configs
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



// const buffer = 5;

const findIndex = (idx, dragOffset, positions) => {
  if (dragOffset > 0) {
    const nextElem = positions[idx + 1];
    if (!nextElem) { return idx }
    const nextElemCenter = nextElem.top + (nextElem.height / 2);
    console.log(dragOffset);
    console.log(nextElem);
    if (dragOffset >= nextElemCenter) {
      return idx + 1;
    }
  } else if (dragOffset < 0) {
    const prevElem = positions[idx - 1];
    if (!prevElem) { return idx }
    const prevElemCenter = prevElem.top + (prevElem.height / 2);
    if (dragOffset <= prevElemCenter) {
      return idx - 1
    }
  }
  // if (dragOffset > positions[idx].top) {
  //   const nextElem = positions[idx + 1];
  //   if (!nextElem) { return idx }
  //   const nextElemCenter = nextElem.top + (nextElem.height / 2);
  //   if (dragOffset >= nextElemCenter) {
  //     return idx + 1;
  //   }
  // } else {
  //   const prevElem = positions[idx - 1];
  //   if (!prevElem) { return idx }
  //   const prevElemCenter = prevElem.top + (prevElem.height / 2);
  //   if (dragOffset <= prevElemCenter) {
  //     return idx - 1
  //   }
  // }
};
export default DragExample;