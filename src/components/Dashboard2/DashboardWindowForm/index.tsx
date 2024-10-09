import React, { useRef, useState } from 'react';
import {
  getDashboardModeData,
  getDashboardUsers,
} from '../../../api/dashboard';
import Loader from '../../Main/Loader';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as S from './style';
import { IDashboardForm, IDashboardFormUser } from '../type';
import TextUI from '../../../uiTs/TextUI';
import DashboardWindowMode from '../DashboardWindowMode';
import { ButtonToggleGroup, ButtonToggleItem } from '../../../ui/ButtonToggle';
import { AnimatePresence, motion } from 'framer-motion';
import DashboardWindowViewType from '../DashboardWindowViewType';
import { ButtonUI } from '../../../ui/ButtonUI';
import Input from '../../../uiTs/Input';

interface DashboardWindowFormProps {
  onClose: () => void;
  sentNewModeForm: (value: IDashboardForm) => void;
}

const DashboardWindowForm = ({
  onClose,
  sentNewModeForm,
}: DashboardWindowFormProps) => {
  const reqUsers = useRef(false);
  const [users, setUsers] = useState<IDashboardFormUser[]>([]);
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { isLoading },
  } = useForm<IDashboardForm>({
    defaultValues: async () => await getDashboardModeData(),
  });

  const onSubmit: SubmitHandler<IDashboardForm> = (data) => {
    sentNewModeForm(data);
    onClose();
  };
  const handleUserChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.currentTarget.value;
    if (value.length <= 2) {
      users.length > 0 && setUsers([]);
      return;
    }
    if (reqUsers.current) {
      return;
    }
    reqUsers.current = true;
    getDashboardUsers(value)
      .then((data) => setUsers(data))
      .finally(() => {
        reqUsers.current = false;
      });
  };
  if (isLoading) {
    return <Loader fill={null} />;
  }
  watch('currentViewedType');
  return (
    <S.DashboardWindowForm onSubmit={handleSubmit(onSubmit)}>
      <S.DashboardWindowFormFileds>
        <TextUI>Режим:</TextUI>
        <S.DashboardWindowMods>
          {getValues('modes').map((mode) => (
            <Controller
              key={mode.UID}
              name='currentModeType'
              control={control}
              render={({ field }) => (
                <DashboardWindowMode
                  {...mode}
                  onChange={(value) => field.onChange(value)}
                  isChecked={field.value === mode.modeType}
                />
              )}
            />
          ))}
        </S.DashboardWindowMods>
      </S.DashboardWindowFormFileds>
      {getValues('isViewerChanger') && (
        <S.DashboardWindowFormFileds>
          <TextUI>Просмотр от:</TextUI>
          <Controller
            control={control}
            name='currentViewedType'
            render={({ field }) => (
              <ButtonToggleGroup fullWidth disabled={false}>
                <ButtonToggleItem
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                    field.onChange(e.currentTarget.id)
                  }
                  id='office'
                  active={field.value}
                >
                  Офис
                </ButtonToggleItem>
                <ButtonToggleItem
                  onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                    field.onChange(e.currentTarget.id)
                  }
                  id='user'
                  active={field.value}
                >
                  Пользователь
                </ButtonToggleItem>
              </ButtonToggleGroup>
            )}
          />
          <AnimatePresence>
            {getValues('currentViewedType') === 'user' && (
              <motion.div
                exit={{ scale: 0 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Input onChange={handleUserChange} />
              </motion.div>
            )}
          </AnimatePresence>
          <S.DashboardWindowList>
            {getValues('currentViewedType') === 'office' &&
              getValues('offices').map((office) => (
                <Controller
                  name='currentViewedId'
                  control={control}
                  key={office.UID}
                  render={({ field }) => (
                    <DashboardWindowViewType
                      object={office}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      isChecked={field.value === office.UID}
                    />
                  )}
                />
              ))}
            {getValues('currentViewedType') === 'user' &&
              users.map((user) => (
                <Controller
                  name='currentViewedId'
                  control={control}
                  key={user.UID}
                  render={({ field }) => (
                    <DashboardWindowViewType
                      object={user}
                      onChange={(value) => {
                        field.onChange(value);
                      }}
                      isChecked={field.value === user.UID}
                    />
                  )}
                />
              ))}
          </S.DashboardWindowList>
        </S.DashboardWindowFormFileds>
      )}
      <S.DashboardWindowFormButtons>
        <ButtonUI
          type='button'
          fullWidth
          variant='outline'
          disabled={false}
          onClick={onClose}
          size='small'
        >
          Отмена
        </ButtonUI>
        <ButtonUI
          type='submit'
          fullWidth
          variant='fill'
          disabled={false}
          onClick={() => {}}
          size='small'
        >
          Применить
        </ButtonUI>
      </S.DashboardWindowFormButtons>
    </S.DashboardWindowForm>
  );
};

export default DashboardWindowForm;
