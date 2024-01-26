import React from 'react';
import { SliderTitle } from '../../../styles/slider';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { LinkUI } from 'ui/LinkUI';
import { TextSpanStyle } from 'styles/styles';
import { useAsyncValue } from 'react-router-dom';

const SliderFeatureStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
  width: 100%;
`;

const SliderFeature = () => {
  const builder = useAsyncValue();
  return (
    <SliderFeatureStyle>
      <TextSpanStyle>
        Действие брони до: {builder?.estimated?.booking}
      </TextSpanStyle>
      <TextSpanStyle>
        Действие уведомлений до: {builder?.estimated?.notification}
      </TextSpanStyle>
      <TextSpanStyle>
        Ссылка на сайт:{' '}
        {builder?.site && (
          <LinkUI href={builder?.site} target='_blank'>
            {builder.name}
          </LinkUI>
        )}
      </TextSpanStyle>
      <TextSpanStyle>Срок оплаты: {builder?.payDate}</TextSpanStyle>
      <TextSpanStyle>Аккредитация: {builder?.accreditation}</TextSpanStyle>
      {builder?.devType === 'ИЖС' && (
        <>
          <TextSpanStyle>Цена от: {builder?.priceFrom}</TextSpanStyle>
          <TextSpanStyle>
            Минимальная площадь от: {builder?.areaMin}
          </TextSpanStyle>
          <TextSpanStyle>
            Материалы застройки:{' '}
            {builder?.passedMaterials.map((materail, idx) => {
              return (
                <>{`${materail.title}${
                  builder?.passedMaterials.length - 1 !== idx ? ', ' : ''
                }`}</>
              );
            })}
          </TextSpanStyle>
        </>
      )}
    </SliderFeatureStyle>
  );
};
export default SliderFeature;
