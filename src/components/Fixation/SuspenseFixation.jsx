import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const FixationContent = React.lazy(() =>
  import('components/Fixation/FixationContent')
);

const SuspenseFixation = () => {
  return (
    <Suspense fallback={<Loader />}>
      <FixationContent />
    </Suspense>
  );
};

export default SuspenseFixation;
