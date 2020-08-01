import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Regular } from '../../styles/fonts';
import colors from '../../styles/colors';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  background: white;
`;

export const Main = styled.KeyboardAvoidingView`
  flex: 1;
  padding: 20px;
`;

export const MessageRow = styled.View`
  width: 100%;
  align-items: ${(props) => props.alignment};
  margin: 2.5px 0;
`;

export const MessageContainer = styled(LinearGradient)`
  max-width: 75%;
  padding: 15px 26px;
  margin-bottom: ${(props) => (props.isLastOne ? '3px' : 0)};
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: ${(props) => (props.fromUser ? '25px' : 0)};
  border-bottom-right-radius: ${(props) => (props.fromUser ? 0 : '25px')};
`;

export const MessageText = styled(Regular)`
  max-width: 75%;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => (props.fromUser ? 'white' : colors.black)};
`;

export const MessageInfo = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: ${(props) => (props.fromUser ? 'flex-end' : 'flex-start')};
  align-items: center;
`;

export const MessageTime = styled(Regular)`
  font-size: 12px;
  line-height: 15px;
  color: ${colors.gray};
  margin-left: 6px;
`;

export const Actions = styled.View`
  width: 100%;
  height: 90px;
  padding: 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const BorderedButton = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 2px solid ${colors.lightGray};
  justify-content: center;
  align-items: center;
`;

export const MessageInput = styled.TextInput`
  flex: 1;
  height: 50px;
  margin: 0 10px;
  padding: 15px 20px;
  border-radius: 25px;
  border: 2px solid ${colors.lightGray};
  font-family: 'SourceSansPro_400Regular';
  font-size: 16px;
  line-height: 20px;
  color: ${colors.gray};
`;
