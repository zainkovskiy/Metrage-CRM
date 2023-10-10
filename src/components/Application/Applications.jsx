import React, { useState } from 'react';
import ApplicationCard from './ApplicationCard';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { device } from 'styles/device';
import Loader from 'components/Main/Loader';
import ButtonLoader from 'ui/ButtonLoader/ButtonLoader';
import { getMoreApplication } from 'store/applicationSlice';

const ApplicationsContainer = styled.div`
  padding: 0.5rem;
  flex-grow: 1;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ApplicationsStyle = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: min-content;
  width: 100%;
  gap: 1rem;
  flex-grow: 1;
  @media ${device.tablet} {
    gap: 0.5rem;
  }
`;

const Applications = ({ firstMount }) => {
  const dispatch = useDispatch();
  const [isButtonMore, setIsButtonMore] = useState(true);
  const applications = useSelector((state) => state.application.applications);
  const loading = useSelector((state) => state.application.loadingList);
  const loadingMore = useSelector((state) => state.application.loadingMore);

  if (firstMount && loading) {
    return <Loader />;
  }

  const more = () => {
    dispatch(getMoreApplication())
      .unwrap()
      .then((data) => {
        if (data?.length < 30) {
          setIsButtonMore(false);
        }
      });
  };
  return (
    <ApplicationsContainer>
      <ApplicationsStyle>
        <AnimatePresence>
          {applications?.length > 0 &&
            applications.map((application) => {
              return (
                <ApplicationCard
                  key={application?.UID}
                  application={application}
                />
              );
            })}
        </AnimatePresence>
      </ApplicationsStyle>
      <AnimatePresence>
        {isButtonMore && applications.length >= 30 && (
          <ButtonLoader onClick={more} loading={loadingMore} fullWidth>
            Загрузить еще
          </ButtonLoader>
        )}
      </AnimatePresence>
    </ApplicationsContainer>
  );
};

export default Applications;
