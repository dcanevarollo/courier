import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { SemiBold, Bold } from '../../styles/fonts';
import colors from '../../styles/colors';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background: white;
`;

export const ChatBox = styled.View`
  width: 100%;
  height: 100px;
  padding: 15px 20px;
  flex-direction: row;
  border-bottom-color: ${colors.lightGray};
  border-bottom-width: 1px;
  border-style: solid;
`;

export const PreviewContainer = styled.View`
  flex: 5;
`;

export const Name = styled(Bold)`
  font-size: 20px;
  line-height: 25px;
  color: ${colors.black};
  margin-bottom: 5px;
`;

export const Preview = styled(SemiBold)`
  margin-right: 20px;
  font-size: 14px;
  line-height: 18px;
  color: ${colors.gray};
`;

export const MetadataContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const Timing = styled(SemiBold)`
  font-size: 16px;
  line-height: 20px;
  color: ${colors.gray};
  margin-bottom: 8px;
`;

export const UnreadContainer = styled(LinearGradient)`
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const UnreadCounter = styled(SemiBold)`
  font-size: 12px;
  line-height: 15px;
  color: white;
`;
