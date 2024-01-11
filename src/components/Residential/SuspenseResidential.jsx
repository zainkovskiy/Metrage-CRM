import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const ResidentialContext = React.lazy(() =>
  import('components/Residential/ResidentialContext')
);
const SuspenseResidential = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ResidentialContext />
    </Suspense>
  );
};

export default SuspenseResidential;
