import React, {useCallback, useState, useEffect, useRef} from 'react';

import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {Alert, View, Text} from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useAuth} from '../../hooks/auth';
import firebase from '../../services/firebase';

import pokedex from '../../services/pokedex';
import unknown from '../../assets/unknown.jpg';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  PokemonsList,
  PokemonsListTitle,
  PokemonContainer,
  PokemonAvatar,
  PokemonInfo,
  PokemonName,
  FindPokemon,
  PokemonCatch,
} from './styles';

export interface Pokemon {
  id: number;
  name: string;
  sprites?: {
    front_default: string;
  };
}

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [find, setFind] = useState<Pokemon>();
  const {user} = useAuth();
  const {navigate} = useNavigation();

  useEffect(() => {
    firebase
      .database()
      .ref(`pokemons/${user.id}`)
      .on('value', (snapshot) => {
        const list: Pokemon[] = [];

        snapshot.forEach((item) => {
          list.push({
            id: item.val().id as number,
            name: item.val().name as string,
          });
        });

        setPokemons(list);
      });
  }, [user]);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToPokemonInfo = useCallback(
    (PokemonId: string) => {
      navigate('PokemonInfo', {PokemonId});
    },
    [navigate],
  );

  const handleFindPokemon = useCallback(async (data: {find: string}) => {
    try {
      const response = await pokedex.get(`pokemon/${data.find}`);

      setFind(response.data);
    } catch (err) {
      Alert.alert('Erro na busca', 'Pokemon não encontrado');
    }
  }, []);

  const handleAddPokemon = useCallback(async () => {
    try {
      if (!find) {
        Alert.alert('Pokemon inexistente');
        return;
      }

      firebase
        .database()
        .ref(`pokemons/${user.id}`)
        .child(`${find.id}`)
        .set({
          id: find.id,
          name: find.name,
        })
        .then(() => {
          Alert.alert('Pokemon registrado com sucesso!');
          setFind(undefined);
        });
    } catch (err) {
      Alert.alert('Erro na adição do pokemon, tente novamente');
    }
  }, [find, user]);

  const handleRemovePokemon = useCallback(
    async (id: string) => {
      try {
        firebase
          .database()
          .ref(`pokemons/${user.id}/${id}`)
          .remove()
          .then(() => {
            Alert.alert('Pokemon removido com sucesso');
            setFind(undefined);
          });
      } catch (err) {
        Alert.alert('Erro na remoção do pokemon, tente novamente');
      }
    },
    [user],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <ProfileButton onPress={navigateToProfile}>
            <UserName>{user.name}</UserName>
          </ProfileButton>
        </HeaderTitle>

        {user.avatar_url && user.avatar_url !== '' ? (
          <UserAvatar source={{uri: user.avatar_url}} />
        ) : (
          <UserAvatar source={unknown} />
        )}
      </Header>

      <FindPokemon>
        <Form ref={formRef} onSubmit={handleFindPokemon}>
          <Input
            autoCorrect={false}
            name="find"
            icon="search"
            placeholder="Nome do pokemon"
            returnKeyType="send"
            onSubmitEditing={() => {
              formRef.current?.submitForm();
            }}
          />
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}>
            Buscar
          </Button>
        </Form>

        {find && find.sprites && (
          <PokemonCatch>
            <PokemonAvatar source={{uri: find.sprites.front_default}} />
            <Text>{find.name}</Text>
            <TouchableOpacity
              onPress={handleAddPokemon}
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="plus" size={32} color="#02a9a6" />
              <View>
                <Text>Adicionar</Text>
              </View>
            </TouchableOpacity>
          </PokemonCatch>
        )}
      </FindPokemon>

      <PokemonsList
        data={pokemons}
        keyExtractor={(pokemon) => `${pokemon.id}`}
        ListHeaderComponent={<PokemonsListTitle>Minha lista</PokemonsListTitle>}
        renderItem={({item: pokemon}) => (
          <PokemonContainer onPress={() => navigateToPokemonInfo(pokemon.name)}>
            {/* <PokemonAvatar source={{uri: Pokemon.avatar_url}} /> */}

            <PokemonInfo>
              <PokemonName>{pokemon.name}</PokemonName>
            </PokemonInfo>
            <TouchableOpacity
              onPress={() => {
                handleRemovePokemon(`${pokemon.id}`);
              }}>
              <Icon name="trash" size={18} color="#02a9a6" />
            </TouchableOpacity>
          </PokemonContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
