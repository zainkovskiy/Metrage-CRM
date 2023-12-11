import React, { Children } from 'react';
import styled from 'styled-components';

const RadioButtonGroupStyle = styled.div`
  width: 100%;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const RadioButtonGroup = ({ name, onChange, value, children }) => {
  const handleChange = (e) => {
    const value = e.target.id;
    onChange(value);
  };
  return (
    <RadioButtonGroupStyle>
      {Children.map(children, (child) => {
        return React.cloneElement(child, {
          ...child.props,
          name: name,
          onChange: handleChange,
          active: value,
        });
      })}
    </RadioButtonGroupStyle>
  );
};

export default RadioButtonGroup;
