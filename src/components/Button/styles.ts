import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 320px;
  height: 48px;
  background: #02a9a6;
  align-self: center;
  border-radius: 30px;
  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-family: 'VT323-Medium';
  color: #e8f3f0;
  font-size: 18px;
`;
