import React from 'react';
import * as S from './style';
import { Controller, useForm } from 'react-hook-form';
import { SelectLaag, SelectLaagItemUI } from 'ui/SelectLaag/SelectLaag';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { useDateFormat } from 'hooks/DateFormat';
import { TextSpanStyle } from 'styles/styles';
import { readNews } from '../../api/newsApi';

const NewsItem = ({ news, _next }) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = (data) => {
    return readNews({
      ...data,
      newsId: news.UID,
    }).then((answer) => {
      if (answer === 'OK') {
        _next();
      }
    });
  };
  return (
    <S.NewsContainer onSubmit={handleSubmit(onSubmit)}>
      <S.NewsTitle
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {news.newsTitle}{' '}
        <span>от {useDateFormat(news.newsDate, 'DD.MM.YYYY')}</span>
      </S.NewsTitle>
      <S.NewsContent
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ flexGrow: 1 }}>
          {news?.newsImg && <S.NewsImage src={news.newsImg} />}
          <TextSpanStyle size={12}>{news.newsText}</TextSpanStyle>
        </div>
      </S.NewsContent>
      <S.InputsContainer
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.3 }}
      >
        {news?.newsType === 'select' && (
          <Controller
            control={control}
            name='answer'
            rules={
              news?.answerRequired && {
                required: 'Поле обязательное',
              }
            }
            render={({ field }) => (
              <SelectLaag
                small
                select={field.value || ''}
                onChange={field.onChange}
                inputRef={field.ref}
                label={news.selectNewsBoxText}
                overflowContainer
                error={errors?.answer}
              >
                {news.selectNewsBoxItems.map((options) => (
                  <SelectLaagItemUI key={options} value={options}>
                    {options}
                  </SelectLaagItemUI>
                ))}
              </SelectLaag>
            )}
          />
        )}
        {news?.newsType === 'input' && (
          <Controller
            name='answer'
            control={control}
            defaultValue={news?.justInputNewsBoxValue || ''}
            rules={
              news?.answerRequired && {
                required: 'Поле обязательное',
              }
            }
            render={({ field }) => (
              <InputUI
                {...field}
                label={news.justInputNewsBoxText}
                fullWidth
                small
                error={errors?.answer}
              />
            )}
          />
        )}
      </S.InputsContainer>
      <Box jc='flex-end'>
        <ButtonUI size='small' type='submit' disabled={isSubmitting}>
          Далее
        </ButtonUI>
      </Box>
    </S.NewsContainer>
  );
};

export default NewsItem;
