import React from 'react';
import * as S from './style';
import { IDashboardFormOffice, IDashboardFormUser } from '../type';
import TextUI from '../../../uiTs/TextUI';

interface DashboardWindowViewTypeOwnProps<T> {
  object: T;
  onChange: (value: number) => void;
  isChecked: boolean;
}
interface OwnKeyProps {
  [key: string]: string | number;
}
type DefaultProps = OwnKeyProps & (IDashboardFormUser | IDashboardFormOffice);
const DashboardWindowViewType = <T extends DefaultProps>(
  props: DashboardWindowViewTypeOwnProps<T>
) => {
  const {
    object: { UID, title, fullName },
    onChange,
    isChecked,
  } = props;
  const handleClick = () => {
    onChange(UID);
  };
  return (
    <S.DashboardWindowViewType onClick={handleClick} $isChecked={isChecked}>
      <S.DashboardWindowViewTypeText>
        <TextUI>{title || fullName}</TextUI>
      </S.DashboardWindowViewTypeText>
    </S.DashboardWindowViewType>
  );
};

export default DashboardWindowViewType;
