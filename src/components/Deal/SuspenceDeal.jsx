import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const DealContent = React.lazy(() => import('components/Deal/DealContent'));

const SuspenceDeal = () => {
  return (
    <Suspense fallback={<Loader/>}> 
      <DealContent/>
    </Suspense>
  );
};

export default SuspenceDeal;