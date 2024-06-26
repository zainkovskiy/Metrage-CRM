import * as React from "react";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
// import { findIndex, Position } from "./find-index";
// import move from "array-move";

const Item = ({ color, setPosition, moveItem, i }) => {
  const [isDragging, setDragging] = useState(false);
  const ref = useRef(null);
  const dragOriginY = useMotionValue(0);

  // Update the measured position of the item so we can calculate when we should rearrange.
  useEffect(() => {
    setPosition(i, {
      height: ref.current.offsetHeight,
      top: ref.current.offsetTop
    });
  });

  return (
    <motion.li
      ref={ref}
      initial={false}
      // If we're dragging, we want to set the zIndex of that item to be on top of the other items.
      animate={isDragging ? onTop : flat}
      style={{ background: color, height: heights[color] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 1.12 }}
      drag="y"
      dragOriginY={dragOriginY}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
      onDrag={(e, { point }) => moveItem(i, point.y)}
      // positionTransition={({ delta }) => {
      //   if (isDragging) {
      //     // If we're dragging, we want to "undo" the items movement within the list
      //     // by manipulating its dragOriginY. This will keep the item under the cursor,
      //     // even though it's jumping around the DOM.
      //     dragOriginY.set(dragOriginY.get() + delta.y);
      //   }

      //   // If `positionTransition` is a function and returns `false`, it's telling
      //   // Motion not to animate from its old position into its new one. If we're
      //   // dragging, we don't want any animation to occur.
      //   return !isDragging;
      // }}
    />
  );
};

export const DragExample = () => {
  const [colors, setColors] = useState(initialColors);

  // We need to collect an array of height and position data for all of this component's
  // `Item` children, so we can later us that in calculations to decide when a dragging
  // `Item` should swap places with its siblings.
  const positions = useRef([]).current;
  const setPosition = (i, offset) => (positions[i] = offset);

  // Find the ideal index for a dragging item based on its position in the array, and its
  // current drag offset. If it's different to its current index, we swap this item with that
  // sibling.
  const moveItem = (i, dragOffset) => {
    const targetIndex = findIndex(i, dragOffset, positions);
    // if (targetIndex !== i) setColors(move(colors, i, targetIndex));
  };

  return (
    <ul style={{width: '100px'}}>
      {colors.map((color, i) => (
        <Item
          key={color}
          i={i}
          color={color}
          setPosition={setPosition}
          moveItem={moveItem}
        />
      ))}
    </ul>
  );
};

// Spring configs
const onTop = { zIndex: 1 };
const flat = {
  zIndex: 0,
  transition: { delay: 0.3 }
};

const initialColors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF"];
const heights = {
  "#FF008C": 60,
  "#D309E1": 80,
  "#9C1AFF": 40,
  "#7700FF": 100
};



// const buffer = 5;

export const findIndex = (i, yOffset, positions) => {
  let target = i;
  const { top, height } = positions[i];
  const bottom = top + height;
  console.log(yOffset);

  // // If moving down
  // if (yOffset > 0) {
  //   const nextItem = positions[i + 1];
  //   if (nextItem === undefined) return i;

  //   const swapOffset =
  //     distance(bottom, nextItem.top + nextItem.height / 2) + buffer;
  //   if (yOffset > swapOffset) target = i + 1;

  //   // If moving up
  // } else if (yOffset < 0) {
  //   const prevItem = positions[i - 1];
  //   if (prevItem === undefined) return i;

  //   const prevBottom = prevItem.top + prevItem.height;
  //   const swapOffset = distance(top, prevBottom - prevItem.height / 2) + buffer;
  //   if (yOffset < -swapOffset) target = i - 1;
  // }

  // return clamp(0, positions.length, target);
};
export default DragExample;