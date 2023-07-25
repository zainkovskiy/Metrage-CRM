import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { device } from 'styles/device';
import Loader from "components/Main/Loader";
import ObjectCard from './ObjectCard';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader'
import { getMoreObjects } from 'store/objectSlice';

const ObjectContainer = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const ObjectStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  flex-grow: 1;
  @media ${device.tablet}{
    gap: 0.5rem;
  }
`
const Objects = ({ firstMount }) => {
  const dispatch = useDispatch();
  const [isButtonMore, setIsButtonMore] = useState(true);
  const loading = useSelector((state) => state.objects.loadingList);
  const loadingMore = useSelector((state) => state.objects.loadingMore);
  const objects = useSelector((state) => state.objects.objects);
  if (firstMount && loading) { return <Loader /> }
  const more = () => {
    dispatch(getMoreObjects()).unwrap().then((data) => {
      if (data?.length < 50) {
        setIsButtonMore(false);
      };
    });
  }
  return (
    <ObjectContainer>
      <ObjectStyle>
        <AnimatePresence>
          {
            objects.length > 0 &&
            objects.map((object) => (
              <ObjectCard key={object.UID} object={object} />
            ))
          }
        </AnimatePresence>
      </ObjectStyle>
      <AnimatePresence>
        {
          isButtonMore && objects.length >= 50 &&
          <ButtonLoader onClick={more} loading={loadingMore} fullWidth>Загрузить еще</ButtonLoader>
        }
      </AnimatePresence>
    </ObjectContainer>
  );
};

export default Objects;