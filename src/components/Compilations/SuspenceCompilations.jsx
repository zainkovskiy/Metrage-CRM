import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const CompilationsContent = React.lazy(() =>
  import('components/Compilations/CompilationsContent')
);

const SuspenceCompilations = () => {
  return (
    <Suspense fallback={<Loader />}>
      <CompilationsContent />
    </Suspense>
  );
};

export default SuspenceCompilations;
