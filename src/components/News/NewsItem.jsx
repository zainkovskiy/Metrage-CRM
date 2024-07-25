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
        <div>
          {news?.newsImg && <S.NewsImage src={news.newsImg} />}
          {/* <TextSpanStyle size={12}>{news.newsText}</TextSpanStyle> */}
          <TextSpanStyle size={12}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
            qui corrupti, est quas earum molestias officia commodi numquam quasi
            ipsam repellendus labore pariatur exercitationem cumque sit autem
            quae id culpa. Culpa, autem quod adipisci doloremque quasi nemo
            pariatur aliquid modi enim provident non ullam? Saepe veritatis
            facere fuga repellendus eum illum laboriosam iusto. Eum, ad odio rem
            error exercitationem quod. Doloremque doloribus expedita quaerat,
            iste culpa veniam ipsa ea corporis labore voluptas natus similique
            nihil dolores ipsam molestias consequatur dolorem. Ex culpa quidem
            corporis assumenda modi nostrum, dolorum vitae a! Ullam quas, amet
            adipisci sit illo odit quis molestias laudantium repudiandae fuga
            quidem similique ipsum qui blanditiis ipsam, saepe explicabo
            voluptate beatae facere a minus optio, non dolore? Nobis, minima.
            Ipsum aliquam commodi dolorum omnis possimus suscipit accusantium
            corporis, nihil enim consequuntur dolores repudiandae distinctio
            consectetur perferendis voluptate earum iste sit mollitia quis ea,
            officiis recusandae, excepturi aut numquam! Accusamus. Commodi
            consectetur, earum dolores eligendi, iusto incidunt sit unde
            asperiores deserunt quasi, quidem deleniti ipsa quibusdam
            blanditiis. Alias, voluptatem. Harum deserunt molestias atque
            impedit accusantium dolorem possimus voluptatibus. Reprehenderit,
            nihil. Voluptatem nesciunt ipsam dolorem quia eos, reprehenderit
            incidunt! Quo, magni? Illum tempore dignissimos odio eaque eveniet
            temporibus a at minima non, ratione nihil officiis praesentium,
            similique nemo architecto nisi alias! Quod fugiat facere, illum
            labore error quos! Laborum cum, consequatur quod, provident alias
            suscipit quia asperiores eum autem quibusdam quidem dolorum voluptas
            beatae repellat, reiciendis commodi sapiente ullam similique
            quisquam! Quam ipsa molestiae, libero impedit nisi vero ullam
            facilis qui sunt molestias, dolor suscipit architecto consectetur
            ducimus velit natus sint enim repellendus numquam eligendi minus
            optio nobis ab atque. Nam. Veritatis modi quaerat magni temporibus
            deserunt unde minima tenetur aperiam officiis, sed, eos ducimus
            alias recusandae ullam neque deleniti repudiandae voluptatibus
            provident doloribus? Optio doloribus nisi tenetur sapiente, itaque
            vero.
          </TextSpanStyle>
        </div>
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
      </S.NewsContent>
      <Box jc='flex-end'>
        <ButtonUI size='small' type='submit' disabled={isSubmitting}>
          Далее
        </ButtonUI>
      </Box>
    </S.NewsContainer>
  );
};

export default NewsItem;
