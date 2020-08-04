import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Pokemon} from './index';

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

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'VT323-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #02a9a6;
  font-family: 'VT323-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const FindPokemon = styled.View`
  margin: 16px;
  display: flex;
`;

export const PokemonCatch = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 8px 12px;
`;

export const PokemonsList = styled(FlatList as new () => FlatList<Pokemon>)`
  padding: 32px 24px 16px;
`;

export const PokemonsListTitle = styled.Text`
  font-family: 'VT323-Medium';
  font-size: 24px;
  color: #3e3b47;
  margin-bottom: 24px;
`;

export const PokemonContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const PokemonAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const PokemonInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const PokemonName = styled.Text`
  font-family: 'VT323-Medium';
  font-size: 18px;
  color: #f4ede8;
`;
