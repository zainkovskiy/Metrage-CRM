import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const UserContent = React.lazy(() => import('components/User/UserContent'));

const SuspenceUser = () => {
  return (
    <Suspense fallback={<Loader />}>
      <UserContent />
    </Suspense>
  );
};

export default SuspenceUser;
