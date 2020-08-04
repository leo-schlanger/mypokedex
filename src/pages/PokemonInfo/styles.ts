import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-family: 'VT323-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin-left: 16px;
`;

export const Content = styled.ScrollView``;

export const PokemonAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  margin-left: auto;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: 'VT323-Medium';
  font-size: 16px;
  color: #232129;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.Text`
  font-size: 24px;
  color: #999591;
  font-family: 'VT323-Regular';
  margin: 12px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: {paddingHorizontal: 24},
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const SectionContentVertical = styled.View`
  padding-left: 24px;
`;

export const PokemonInfoText = styled.Text`
  font-family: 'VT323-Medium';
  font-size: 18px;
  color: #232129;
  margin: 4px 4px;
`;
