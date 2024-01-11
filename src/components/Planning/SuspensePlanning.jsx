import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const PlanningContent = React.lazy(() =>
  import('components/Planning/PlanningContent')
);
const SuspensePlanning = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PlanningContent />
    </Suspense>
  );
};

export default SuspensePlanning;
