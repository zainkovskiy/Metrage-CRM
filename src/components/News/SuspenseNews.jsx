import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const NewsContent = React.lazy(() => import('components/News/NewsContent'));
const SuspenseNews = () => {
  return (
    <Suspense fallback={<Loader />}>
      <NewsContent />
    </Suspense>
  );
};

export default SuspenseNews;
