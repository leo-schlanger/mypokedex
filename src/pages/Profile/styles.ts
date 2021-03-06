import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #232129;
  font-family: 'VT323-Medium';
  margin: 24px 0;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const LogOutButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 93px;
  align-self: center;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;
