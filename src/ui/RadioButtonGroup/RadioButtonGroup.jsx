import React, { Children } from 'react';
import styled from 'styled-components';

const RadioButtonGroupStyle = styled.div`
  width: 100%;
  display: flex;
  ${({ $gap }) => $gap && `gap: ${$gap}`};
  ${({ $wrap }) => $wrap && 'flex-wrap: wrap;'};
  ${({ $disabled }) => $disabled && 'pointer-events: none;'};
`;

const RadioButtonGroup = ({
  name,
  onChange,
  value,
  children,
  disabled,
  wrap,
  gap,
}) => {
  const handleChange = (e) => {
    const value = e.target.id;
    onChange(value);
  };
  return (
    <RadioButtonGroupStyle $disabled={disabled} $wrap={wrap} $gap={gap}>
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
