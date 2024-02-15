import { useLayer } from 'react-laag';
import { useCombobox } from 'downshift';
import { motion, AnimatePresence } from 'framer-motion';

const items = ['apple', 'pear', 'orange', 'grape', 'banana'];

function Autocomplete() {
  // This is the place to store the fruits that match the input value
  const [inputItems, setInputItems] = React.useState(items);

  // This is where downshift's magic comes in!
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    // As the user types, update the `inputItems` that matches the
    // user typed value
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      );
    },
  });

  // only show the menu, when downshift says so and we have actual items to show
  const showMenu = isOpen && inputItems.length > 0;

  // the positioning stuff...
  const { renderLayer, triggerProps, layerProps, triggerBounds, layerSide } =
    useLayer({
      isOpen: showMenu,
      overflowContainer: false, // we want the menu to stay within its scroll-container
      auto: true, // auto find a placement when required
      snap: true, // snap to the possible placements (not in between)
      placement: 'bottom-start', // we prefer placement on the bottom-side
      possiblePlacements: ['top-start', 'bottom-start'], // stick with bottom and top
      triggerOffset: 0, // place the menu directly to the trigger
      containerOffset: 16, // make sure the menu gets a bit of space with respect to the containers edges
    });

  // We're combining the prop-getters of useCombobox with react-laag's props
  // We're also using framer-motion for mount and exit transitions
  return (
    <div className='combobox' {...getComboboxProps()}>
      <input
        {...getInputProps(triggerProps)}
        className='combobox__input'
        placeholder='Search for a fruit...'
      />
      {renderLayer(
        <AnimatePresence>
          {showMenu && (
            <motion.ul
              {...getMenuProps(layerProps)}
              className='combobox__menu'
              style={{
                width: triggerBounds.width, // we want the same width as the input
                ...layerProps.style,
              }}
              initial={{ opacity: 0, scaleY: 0.75 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0.75 }}
              transition={{
                duration: 0.125, // 125ms
              }}
            >
              {inputItems.map((item, index) => (
                <li
                  key={`${item}${index}`}
                  className='combobox__menu-item'
                  {...getItemProps({ item, index })}
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
