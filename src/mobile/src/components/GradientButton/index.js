import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Scaffold, Label } from './styles';
import colors from '../../styles/colors';

export default function GradientButton({
  width = '100%',
  label,
  onPress = () => {},
}) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Scaffold
        width={width}
        colors={[colors.primaryGreen, colors.primaryBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Label>{label}</Label>
      </Scaffold>
    </TouchableOpacity>
  );
}
