import React, { Suspense } from 'react';
import Loader from 'components/Main/Loader';

const ResidentialContent = React.lazy(() =>
  import('components/Residential/ResidentialContent')
);
//TODO: обновлять карточку при закрытии слайда
//TODO: добавить вид Карта
const SuspenseResidential = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ResidentialContent />
    </Suspense>
  );
};

export default SuspenseResidential;
