import React, { useState } from 'react';
import { Box } from 'ui/Box';
import { ButtonLink } from 'ui/ButtonLink';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Close } from 'images/close.svg';
import { ReactComponent as Edit } from 'images/edit.svg';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { useAsyncValue } from 'react-router-dom';
import { useDateFormat } from 'hooks/DateFormat';
import { removeChild } from '../../../api/mortageAPI';

const MortageLoaner = styled.div`
  border-radius: 5px;
  border: 1px solid;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MortageLoanerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(207px, 1fr));
  gap: 0.5rem;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #000;
`;

const SlideMortageLoaner = ({
  loaner,
  openWindowLoaner,
  openWindowChild,
  idx,
}) => {
  const mortage = useAsyncValue();
  const { setValue } = useFormContext();
  const [change, setChange] = useState(false);
  const removeLaoner = () => {
    mortage.loaners = mortage.loaners.filter((item) => item.UID !== loaner.UID);
    setValue('loaners', mortage.loaners, { shouldDirty: true });
  };
  const openEditLoaner = () => {
    openWindowLoaner(loaner);
  };
  const openChild = (child) => {
    openWindowChild({
      idx: idx,
      child: child,
    });
  };
  const deleteChild = (child) => {
    removeChild({ UID: child.UID }).then(() => {
      mortage.loaners[idx].children = mortage.loaners[idx].children.filter(
        (curChild) => curChild.UID !== child.UID
      );
      setChange(!change);
    });
  };
  return (
    <MortageLoaner>
      <Box jc='flex-end'>
        <ButtonLink size={12} color='rgb(28 155 248)' onClick={openEditLoaner}>
          Редактировать
        </ButtonLink>
        <ButtonLink size={12} onClick={removeLaoner}>
          Удалить
        </ButtonLink>
      </Box>
      <TextSpanStyle bold>{loaner.loanerType}</TextSpanStyle>
      <MortageLoanerGrid>
        <Box column jc='flex-start'>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Фамилия:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.lastName}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Имя:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.firstName}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Отчество:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.secondName}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Дата рождения:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.bornDate}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Семейное положение:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.maritalStatus}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Телефон для связи:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.phone}
            </TextSpanStyle>
          </Box>
        </Box>
        <Box column jc='flex-start'>
          <Box column gap='0' ai='flex-start' fullWidth>
            <TextSpanStyle size={12}>Адрес факт. проживания:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.address}
            </TextSpanStyle>
          </Box>
          <Box fullWidth column gap='0'>
            <Box jc='space-between' fullWidth>
              <TextSpanStyle size={12} bold>
                Дети
              </TextSpanStyle>
              <ButtonLink
                size={12}
                color='rgb(133, 0, 158)'
                onClick={() => openChild('new')}
              >
                Добавить
              </ButtonLink>
            </Box>
            {loaner?.children?.length > 0 &&
              loaner?.children.map((child) => (
                <Box
                  fullWidth
                  jc='space-between'
                  ai='flex-start'
                  key={child.UID}
                >
                  <TextSpanStyle size={12}>
                    {child.fullName}{' '}
                    {useDateFormat(child.bornDate, 'DD.MM.YYYY')}
                  </TextSpanStyle>
                  <Box>
                    <IconButton color='info' onClick={() => openChild(child)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color='error'
                      onClick={() => deleteChild(child)}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </MortageLoanerGrid>
      <Line />
      <MortageLoanerGrid>
        <Box column jc='flex-start'>
          <Box column gap='0' ai='flex-start' fullWidth>
            <TextSpanStyle size={12}>
              Основное место работы (Адрес и Наименование):
            </TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.work.nameAndAddress}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Срок сущестования:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.work.termOfOperations}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Телефон руководителя:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.work.chiefPhone}
            </TextSpanStyle>
          </Box>
        </Box>
        <Box column jc='flex-start'>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>ИНН:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.work.INN}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Сфера деятельности:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.work.areaOfActivity}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Численность персонала:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.work.size}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Имя руководителя:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.work.chiefName}
            </TextSpanStyle>
          </Box>
        </Box>
      </MortageLoanerGrid>
      <Line />
      <MortageLoanerGrid>
        <Box column jc='flex-start'>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Среднемесячный доход:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.aboutJobStatus.income}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Стаж на последнем месте:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.aboutJobStatus.experienceLast}
            </TextSpanStyle>
          </Box>
          <Box column gap='0' ai='flex-start' fullWidth>
            <TextSpanStyle size={12}>Имеющиеся кредиты:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.aboutJobStatus.hasCreditInfo}
            </TextSpanStyle>
          </Box>
        </Box>
        <Box column jc='flex-start'>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Зарплатный проект:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.aboutJobStatus.salaryProject}
            </TextSpanStyle>
          </Box>
          <Box jc='space-between' fullWidth>
            <TextSpanStyle size={12}>Общий трудовой стаж:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12} align='end'>
              {loaner.aboutJobStatus.experienceFull}
            </TextSpanStyle>
          </Box>
          <Box column gap='0' ai='flex-start' fullWidth>
            <TextSpanStyle size={12}>ФССП:</TextSpanStyle>
            <TextSpanStyle color='#969696' size={12}>
              {loaner.aboutJobStatus.fsspAbout}
            </TextSpanStyle>
          </Box>
        </Box>
      </MortageLoanerGrid>
    </MortageLoaner>
  );
};

export default SlideMortageLoaner;
