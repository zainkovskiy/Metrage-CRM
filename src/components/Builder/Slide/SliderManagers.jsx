import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SliderManager from './SliderManager';

const SliderManagersStyle = styled.div`
  flex-grow: 1;
  width: 100%;
`;
const SliderManagers = ({ openEditManager }) => {
  const builder = useAsyncValue();
  const [change, setChange] = useState(false);
  const isChange = () => {
    setChange(!change);
  };
  return (
    <SliderManagersStyle>
      {builder?.managers?.length > 0 &&
        builder.managers.map((manager, idx) => (
          <SliderManager
            key={manager.UID + idx}
            manager={manager}
            isChange={isChange}
            openEditManager={openEditManager}
          />
        ))}
    </SliderManagersStyle>
  );
};

export default SliderManagers;
