import React from 'react';
import { useWindowSize } from 'hooks/windowSize';
import { SliderStyle, SliderContext } from '../../../styles/slider';
import SlideUserMeta from './SlideUserMeta';
import SlideFormContainer from './SlideFormContainer';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import SlideUserPhones from './SlideUserPhones';
import SliderUserObjects from './SliderUserObjects';
import SlideUsersStory from './SlideUsersStory';

const SlideUser = () => {
  const windowSize = useWindowSize();
  const user = useAsyncValue();
  const isAdmin = user?.rights?.admin || false;
  const methods = useForm({
    defaultValues: {
      UID: user?.UID,
      lastName: user?.lastName || '',
      firstName: user?.firstName || '',
      secondName: user?.secondName || '',
      email: user?.email || '',
      vkURL: user?.vkURL || '',
      instagramId: user?.instagramId || '',
      birthDate: user?.birthDate || '',
      sex: user?.sex || '',
      isAdmin: user?.isAdmin || false,
      isСashier: user?.isСashier || false,
      speciality: user?.speciality.current || [],
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
      {isAdmin && windowSize > 768 && <SlideUsersStory />}
    </SliderStyle>
  );
};

export default SlideUser;
