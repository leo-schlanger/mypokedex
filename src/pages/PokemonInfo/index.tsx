/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useCallback, useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/Feather';
import {useRoute, useNavigation} from '@react-navigation/native';

import {ActivityIndicator} from 'react-native';

import Axios from 'axios';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Content,
  PokemonAvatar,
  Section,
  SectionTitle,
  SectionContent,
  SectionContentVertical,
  PokemonInfoText,
  PokemonPicture,
} from './styles';

import pokedex from '../../services/pokedex';

interface RouteParams {
  pokemonId: string;
  picture: string;
}

export interface Pokemon {
  id: number;
  name: string;
  abilities: {
    ability: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

const PokemonInfo: React.FC = () => {
  const route = useRoute();
  const {goBack} = useNavigation();

  const routeParams = route.params as RouteParams;

  const [pokemon, setPokemon] = useState<Pokemon>();
  const [picture, setPicture] = useState<string>();
  const [evolutions, setEvolutions] = useState<string[]>([]);

  useEffect(() => {
    pokedex.get(`pokemon/${routeParams.pokemonId}`).then(async (response) => {
      const speciesDetails = await pokedex.get(
        `pokemon-species/${response.data.name}/`,
      );

      const list = await Axios.get(speciesDetails.data.evolution_chain.url);

      const listEvolutions = list.data.chain.evolves_to.map(
        (item: {species: {name: string}}) => item.species.name,
      );

      setEvolutions(listEvolutions);
      setPicture(routeParams.picture);
      setPokemon(response.data);
    });
  }, [routeParams]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  if (!pokemon) {
    return (
      <Container>
        <Header>
          <BackButton onPress={navigateBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </BackButton>
        </Header>

        <Content>
          <ActivityIndicator
            size={120}
            color="#28262e"
            style={{alignSelf: 'center', marginTop: 240}}
          />
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>{pokemon.name}</HeaderTitle>

        <PokemonAvatar source={{uri: pokemon.sprites.front_default}} />
      </Header>

      <Content>
        {picture && <PokemonPicture source={{uri: picture}} />}
        <Section>
          <SectionTitle>Informações Básicas:</SectionTitle>

          <SectionContentVertical>
            <PokemonInfoText>Número : {pokemon.id}</PokemonInfoText>
            <PokemonInfoText>Altura : {pokemon.height}</PokemonInfoText>
            <PokemonInfoText>Peso : {pokemon.weight}</PokemonInfoText>
          </SectionContentVertical>
        </Section>
        <Section>
          <SectionTitle>Tipo:</SectionTitle>

          <SectionContent>
            {pokemon.types.map((item) => (
              <PokemonInfoText>{item.type.name}</PokemonInfoText>
            ))}
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>Status:</SectionTitle>

          <SectionContentVertical>
            {pokemon.stats.map((stat) => (
              <PokemonInfoText>
                {stat.stat.name} : {stat.base_stat}
              </PokemonInfoText>
            ))}
          </SectionContentVertical>
        </Section>
        <Section>
          <SectionTitle>Habilidades:</SectionTitle>

          <SectionContent>
            {pokemon.abilities.map((item) => (
              <PokemonInfoText>{item.ability.name}</PokemonInfoText>
            ))}
          </SectionContent>
        </Section>
        <Section>
          <SectionTitle>Evoluções:</SectionTitle>

          <SectionContent>
            {evolutions.map((item) => (
              <PokemonInfoText>{item}</PokemonInfoText>
            ))}
          </SectionContent>
        </Section>
      </Content>
    </Container>
  );
};

export default PokemonInfo;
