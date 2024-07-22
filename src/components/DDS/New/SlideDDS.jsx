import React from 'react';
import { SliderContext, SliderStyle } from '../../../styles/slider';
import SlideDDSMeta from './SlideDDSMeta';
import { FormProvider, useForm } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import SlideDDSMain from './SlideDDSMain';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderFormButtonGroup } from '../../../styles/SliderFormButtonGroup';
import styled from 'styled-components';
import SlideDDSInfo from './SlideDDSInfo';
import { useDispatch } from 'react-redux';
import { actionDds } from '../../../store/slices/ddsSlice';
import SlideDDSOperation from './SlideDDSOperation';

const SliderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SlideDDS = ({ onClose }) => {
  const dds = useAsyncValue();
  const dispatch = useDispatch();
  const method = useForm({
    defaultValues: dds,
  });
  const onSubmit = (data) => {
    dispatch(actionDds(data))
      .unwrap()
      .finally(() => {
        onClose();
      });
  };
  const _addInfo = () => {
    dds.addiction = [...dds.addiction, emptyObjectInfo];
    method.setValue(
      'addiction',
      [...method.getValues('addiction'), emptyObjectInfo],
      { shouldDirty: true }
    );
  };
  const isButtonMore = () => {
    const regExp = new RegExp('New', 'i');
    if (regExp.test(dds?.UID)) {
      if (method.getValues('addiction').at(-1).category) {
        return true;
      }
      return false;
    }
    return false;
  };
  method.watch('operation');
  method.watch('addiction');
  return (
    <SliderStyle>
      <SliderContext>
        <SlideDDSMeta />
        <FormProvider {...method}>
          <SliderForm onSubmit={method.handleSubmit(onSubmit)}>
            <SlideDDSMain />
            {dds?.addiction.map((info, idx) => (
              <SlideDDSInfo info={info} key={idx} idx={idx} />
            ))}
            {dds?.operation?.needRisovat && <SlideDDSOperation />}
            {isButtonMore() && (
              <ButtonUI variant='outline' size='small' onClick={_addInfo}>
                Еще запись...
              </ButtonUI>
            )}
            {(dds?.fromDeal || method.formState.isDirty) && (
              <SliderFormButtonGroup>
                <TextSpanStyle>Сохранить изменения?</TextSpanStyle>
                <ButtonUI type='submit' size='small'>
                  Сохранить
                </ButtonUI>
              </SliderFormButtonGroup>
            )}
          </SliderForm>
        </FormProvider>
      </SliderContext>
    </SliderStyle>
  );
};

const emptyObjectInfo = {
  ddsType: '0',
  salaryResipient: null,
  coming: 0,
  expense: 0,
  category: '',
  subCategory: null,
  comment: null,
};

export default SlideDDS;
