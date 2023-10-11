import React, { Suspense, useEffect } from 'react';
import Loader from 'components/Main/Loader';

const ClientContent = React.lazy(() =>
  import('components/Client/ClientContent')
);

const SuspenceClient = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ClientContent />
    </Suspense>
  );
};

export default SuspenceClient;
