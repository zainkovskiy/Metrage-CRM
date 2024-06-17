import React from 'react';
import imgErrorUrl from 'images/img-error.svg';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from 'hooks/StringHook';
import { Link } from 'react-router-dom';

const FeatureBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;
const FeatureLine = styled.div``;
const FeatureProp = styled(TextSpanStyle)`
  position: relative;
  display: block;
  overflow: hidden;
  &:after {
    content: '';
    position: absolute;
    margin-left: 0.3rem;
    bottom: 0.35em;
    width: 100%;
    border-bottom: 0.1em dotted;
  }
`;
const FeatureValue = styled(TextSpanStyle)`
  float: right;
  padding-left: 0.3rem;
`;
const BusinessObject = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ImageContainer = styled(Link)`
  width: 50%;
  transition: opacity 0.3s;
  @media (hover: hover) {
    &:hover {
      opacity: 0.7;
    }
    &:active {
      opacity: 1;
    }
  }
`;
const SlideResidentialBusinessObject = ({ object }) => {
  return (
    <BusinessObject>
      <ImageContainer to={`/objects/business/${object.UID}`}>
        <Image src={object.photoUrl || imgErrorUrl} />
      </ImageContainer>
      <FeatureBlock>
        <FeatureLine>
          <FeatureValue size={10}>{object?.Category}</FeatureValue>
          <FeatureProp size={10}>Тип</FeatureProp>
        </FeatureLine>
        <FeatureLine>
          <FeatureValue size={10}>{object?.TotalArea}м2</FeatureValue>
          <FeatureProp size={10}>Площадь</FeatureProp>
        </FeatureLine>
        <FeatureLine>
          <FeatureValue size={10}>{object?.AvailableFrom}</FeatureValue>
          <FeatureProp size={10}>Дата освобождения</FeatureProp>
        </FeatureLine>
        <FeatureLine>
          <FeatureValue size={10}>
            {useNumberTriad(object?.BargainTermsPrice || 0)}
          </FeatureValue>
          <FeatureProp size={10}>Цена</FeatureProp>
        </FeatureLine>
      </FeatureBlock>
    </BusinessObject>
  );
};

export default SlideResidentialBusinessObject;
