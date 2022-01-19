import React, { useEffect } from 'react';
import styled from 'styled-components/native';

import { connectToStore, requestApi } from '../../helpers';

import MovieGroup from '../../components/movie-group';
import MovieDetail from '../../components/movie-detail';

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${props => props.isConnected ? props.theme.color.black : props.theme.color.oldred};
  padding: ${props => props.theme.typography.px([20, 0])};
  `;

const SearchWrapper = styled.View`
    padding: ${props => props.theme.typography.px([0, 10, 15])};
`;

const SearchButton = styled.TouchableOpacity`
  border: 1px solid ${props => props.theme.color.white};
  border-radius: ${props => props.theme.typography.px(16)};
  padding: ${props => props.theme.typography.px([8, 10])};
`;

const SearchText = styled.Text`
  color: ${props => props.theme.color.grey5};
  font-size: ${props => props.theme.typography.px(13)};
  font-weight: bold;
`;

const StyledScrollView = styled.ScrollView``;

const MainScreen = ({ navigation, isConnected, movies, favorites, blacklists, setMovie }) => {
  const gotoSearch = () => navigation.navigate('search');

  useEffect(() => {
    if (movies.length === 0) {
      requestApi({
        s: 'gun'
      })
      .then(res => {
        setMovie(state => ({
          ...state,
          list: res.Search
        }));
      });
    }
  }, [movies]);

  return (
    <Wrapper isConnected={isConnected}>
      <SearchWrapper>
        <SearchButton onPress={gotoSearch}>
          <SearchText>Search movies...</SearchText>
        </SearchButton>
      </SearchWrapper>
      <StyledScrollView showVerticalIndicator={false}>
        <MovieGroup
          title="Movie List: last you search"
          list={movies}
        />
        <MovieGroup
          type="grid"
          title="Favorites"
          list={favorites}
        />
        <MovieGroup
          type="grid"
          title="Blacklists"
          list={blacklists}
        />
      </StyledScrollView>
    </Wrapper>
  )
}

export default connectToStore(
  {
    movies: ['movie', 'list'],
    favorites: ['user', 'favorites'],
    blacklists: ['user', 'blacklists'],
    isConnected: ['network', 'isConnected'],
  },
  ['movie']
)(MainScreen);