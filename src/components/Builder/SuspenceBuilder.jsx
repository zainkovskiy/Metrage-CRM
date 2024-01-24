import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const BuilderContent = React.lazy(() =>
  import('components/Builder/BuilderContent')
);

const SuspenceBuilder = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BuilderContent />
    </Suspense>
  );
};

export default SuspenceBuilder;
