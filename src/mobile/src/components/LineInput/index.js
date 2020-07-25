import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextInputMask } from 'react-native-masked-text';
import { useField } from '@unform/core';

import { Container, Border, TextInput, Label, Error } from './styles';
import colors from '../../styles/colors';

export default function LineInput({
  name,
  label,
  width = '100%',
  onChangeText,
  rawValue,
  ...rest
}) {
  const inputRef = useRef(null);

  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  const [valid, setValid] = useState(false);
  const [active, setActive] = useState(false);
  const [borderColors, setBorderColors] = useState([
    colors.lightGray,
    colors.lightGray,
  ]);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (inputRef.current) {
      const { value } = inputRef.current;

      if (value && value !== '') setValid(true);
      else setValid(false);
    }
  }, [inputRef.current]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return rawValue || ref.value;
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (active) setBorderColors([colors.primaryGreen, colors.primaryBlue]);
    else if (valid) setBorderColors([colors.gray, colors.gray]);
    else setBorderColors([colors.lightGray, colors.lightGray]);
  }, [active]);

  useEffect(() => {
    if (error) setBorderColors([colors.red, colors.red]);
  }, [error]);

  const handleOnChange = useCallback(
    (text) => {
      if (text !== '') setValid(true);
      else setValid(false);

      if (inputRef.current) inputRef.current.value = text;

      if (onChangeText) onChangeText(text);
    },
    [onChangeText]
  );

  return (
    <Container width={width}>
      {label && (
        <Label error={error} active={active} valid={valid}>
          {label}
        </Label>
      )}
      <TextInput
        ref={inputRef}
        keyboardAppearance="dark"
        defaultValue={defaultValue}
        style={{ includeFontPadding: true, textAlignVertical: 'center' }}
        placeholderTextColor={error ? colors.red : colors.gray}
        onFocus={() => {
          clearError();
          setActive(true);
        }}
        onBlur={() => setActive(false)}
        onChangeText={handleOnChange}
        {...rest}
      />
      <Border
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={borderColors}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export function MaskedInput({ type, ...rest }) {
  const [value, setValue] = useState('');
  const [rawValue, setRawValue] = useState('');

  const handleOnChangeText = useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue);
    setRawValue(unmaskedValue);
  }, []);

  return (
    <TextInputMask
      type={type}
      includeRawValueInChangeText
      value={value}
      onChangeText={handleOnChangeText}
      customTextInput={LineInput}
      customTextInputProps={{ rawValue, ...rest }}
      {...rest}
    />
  );
}
