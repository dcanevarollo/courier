import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Feather as Icon } from '@expo/vector-icons';

import Avatar from '../Avatar';

import { Container, LeftSide, Title } from './styles';
import colors from '../../styles/colors';

export default function Header({ title, figure, rightSide = true }) {
  const route = useRoute();

  return (
    <Container>
      <LeftSide>
        {figure && <Avatar uri={figure} size={40} marginRight="10px" />}
        <Title numberOfLines={1}>{title || route.name}</Title>
      </LeftSide>

      {rightSide && (
        <TouchableOpacity activeOpacity={0.5}>
          <Icon name="user-plus" size={28} color={colors.primaryBlue} />
        </TouchableOpacity>
      )}
    </Container>
  );
}
