import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const ResidentialContent = React.lazy(() =>
  import('components/Residential/ResidentialContent')
);
const SuspenseResidential = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ResidentialContent />
    </Suspense>
  );
};

export default SuspenseResidential;
