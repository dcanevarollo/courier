import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Form as Unform } from '@unform/mobile';
import { Picker } from '@react-native-community/picker';
import { LinearGradient } from 'expo-linear-gradient';

import { Regular, SemiBold, Bold } from '../../styles/fonts';
import colors from '../../styles/colors';

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  background: white;
  padding: 20px;
`;

export const PageTitle = styled(Bold)`
  font-size: 32px;
  line-height: 40px;
  color: ${colors.black};
  margin-bottom: 10px;
`;

export const PageSubtitle = styled(Regular)`
  font-size: 20px;
  line-height: 25px;
  color: ${colors.black};
  margin-bottom: ${(props) => (props.step === 1 ? '60px' : '100px')};
`;

export const FormContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Form = styled(Unform)`
  width: 100%;
`;

export const PickerBox = styled(Picker)`
  width: 100%;
  height: 50px;
  font-size: 20px;
`;

export const PickerLine = styled.View`
  width: 100%;
  height: 2px;
  margin-bottom: 10px;
  background: ${colors.lightGray};
`;

export const InputsRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ControlsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const ControlLink = styled(SemiBold)`
  font-size: 20px;
  line-height: 25px;
  color: ${(props) => (props.advance ? colors.primaryBlue : colors.darkGray)};
`;

export const PictureBorder = styled(LinearGradient)`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export const Picture = styled.Image`
  width: 196px;
  height: 196px;
  background: white;
  border-radius: 98px;
  justify-content: center;
  align-items: center;
`;
