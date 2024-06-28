import React, { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { ButtonUI } from 'ui/ButtonUI';
import { useDispatch } from 'react-redux';
import { ButtonToggleGroup, ButtonToggleItem } from 'ui/ButtonToggle';
import { checkedPhone } from '../../../api/fixationApi';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
import ClientFields from './ClientFields';
import * as S from './styleNew';
import ObjectFields from './ObjectFields';
import { createFixation } from '../../../store/slices/fixationSlice';

const NewFixation = ({ onClose }) => {
  const dispatch = useDispatch();
  const [phoneRight, setPhoneRight] = useState(null);
  const method = useForm({
    defaultValues: { fixationType: '0', typeObject: '0', suburbanType: '1' },
  });
  const onSubmit = (data) => {
    return dispatch(createFixation(data))
      .unwrap()
      .then(() => {
        onClose();
      });
  };
  const isCheckedPhone = () => {
    checkedPhone(method.getValues('phone')).then((data) => {
      setPhoneRight(data);
    });
  };
  method.watch('fixationType');
  method.watch('phone');
  return (
    <S.NewFixation onSubmit={method.handleSubmit(onSubmit)}>
      <FormProvider {...method}>
        <S.FormContainer>
          <Controller
            control={method.control}
            name='fixationType'
            rules={{ required: true }}
            render={({ field }) => (
              <LabelStyle>
                Тип фиксации:
                <ButtonToggleGroup fullWidth>
                  <ButtonToggleItem
                    onClick={(e) => field.onChange(e.target.id)}
                    id='0'
                    active={field.value}
                  >
                    Уведомление
                  </ButtonToggleItem>
                  <ButtonToggleItem
                    onClick={(e) => field.onChange(e.target.id)}
                    id='1'
                    active={field.value}
                  >
                    Бронь
                  </ButtonToggleItem>
                </ButtonToggleGroup>
              </LabelStyle>
            )}
          />
          <ClientFields
            phoneRight={phoneRight}
            isCheckedPhone={isCheckedPhone}
          />
          {phoneRight?.nextStep && <ObjectFields />}
        </S.FormContainer>
        <ButtonUI
          type='submit'
          disabled={method.formState.isSubmitting || !phoneRight?.nextStep}
        >
          Сохранить
        </ButtonUI>
      </FormProvider>
    </S.NewFixation>
  );
};

export default NewFixation;
