import React from 'react';
import Loader from 'components/Main/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import BuildersCard from './BuildersCard';
import styled from 'styled-components';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getBuilderListMore } from '../../store/slices/builderSlice';

const BuildersContainer = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  flex-grow: 1;
`;
const BuildersStyle = styled.table`
  overflow: auto;
  border-collapse: collapse;
  width: 100%;
  min-width: 700px;
`;
const Builders = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.builder.loadingList);
  const builders = useSelector((state) => state.builder.builders);
  const buttonMore = useSelector((state) => state.builder.buttonMore);
  const loadingMore = useSelector((state) => state.builder.loadingMore);
  const loadMore = () => {
    dispatch(getBuilderListMore());
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <BuildersContainer>
      <BuildersStyle>
        <tbody>
          {builders.map((building) => (
            <BuildersCard key={building.UID} building={building} />
          ))}
        </tbody>
      </BuildersStyle>
      <AnimatePresence>
        {buttonMore && (
          <ButtonLoader onClick={loadMore} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </BuildersContainer>
  );
};

export default Builders;
