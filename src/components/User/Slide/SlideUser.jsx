import React from 'react';
import { useWindowSize } from 'hooks/windowSize';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideUserMeta from './SlideUserMeta';
import SlideFormContainer from './SlideFormContainer';
import SlideClientStory from './SlideClientStory';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import SlideUserPhones from './SlideUserPhones';
import SliderUserObjects from './SliderUserObjects';

const SlideUser = () => {
  const windowSize = useWindowSize();
  const user = useAsyncValue();
  const methods = useForm({
    defaultValues: {
      UID: user?.UID,
      lastName: user?.lastName || '',
      firstName: user?.firstName || '',
      secondName: user?.secondName || '',
      email: user?.email || '',
      birthDate: user?.birthDate || '',
      sex: user?.sex || '',
      isAdmin: user?.isAdmin || false,
      isСashier: user?.isСashier || false,
    },
  });
  return (
    <SliderStyle>
      <SliderContext>
        <SlideUserMeta />
        <FormProvider {...methods}>
          <SlideFormContainer />
        </FormProvider>
        <SlideUserPhones />
        <SliderUserObjects />
      </SliderContext>
      {/* {windowSize > 768 && <SlideClientStory />} */}
    </SliderStyle>
  );
};

export default SlideUser;
