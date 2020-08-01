import React from 'react';
import { StatusBar } from 'expo-status-bar';

import Avatar from '../../components/Avatar';

import {
  Container,
  ChatBox,
  ChatInfo,
  PreviewContainer,
  Name,
  Preview,
  MetadataContainer,
  Timing,
  UnreadContainer,
  UnreadCounter,
} from './styles';
import colors from '../../styles/colors';

export default function Chats() {
  return (
    <Container>
      <StatusBar style="dark" />

      <ChatBox>
        <Avatar
          uri="https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4"
          size={70}
          marginRight="20px"
          online
        />
        <PreviewContainer>
          <Name>Diego Rocketseat</Name>
          <Preview numberOfLines={2}>Fala deeeev...</Preview>
        </PreviewContainer>

        <MetadataContainer>
          <Timing>09:23</Timing>
        </MetadataContainer>
      </ChatBox>

      <ChatBox>
        <Avatar size={70} marginRight="20px" />
        <PreviewContainer>
          <Name>Elon Musk</Name>
          <Preview numberOfLines={2}>
            Dude, I really hope that this shit don&apos;t shake our
            relationship, ok? You&apos;re very important for me, u know that
          </Preview>
        </PreviewContainer>

        <MetadataContainer>
          <Timing>11:31</Timing>
          <UnreadContainer colors={colors.mainGradient}>
            <UnreadCounter>2</UnreadCounter>
          </UnreadContainer>
        </MetadataContainer>
      </ChatBox>
    </Container>
  );
}
