import React, { memo } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import MovieCard from '../movie-card';

const width = Dimensions.get('window').width;

const ListWrapper = styled.ScrollView`
  padding: ${props => props.theme.typography.px([0, 5])};
`;

const GridWrapper = styled.ScrollView`
  padding: ${props => props.theme.typography.px(0)};
`;

const GridListWrapper = styled.View`
  width: ${width}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const NoListWrapper = styled.View`
  width: ${width}px;
  justify-content: center;
  align-items: center;
`;

const MovieText = styled.Text`
  padding: ${props => props.theme.typography.px([80, 0])};
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.typography.px(12)};
  font-weight: bold;
`;

const MovieList = memo(({ type = 'list', list = [] }) => {
  return (
    <SafeAreaView>
      {type === 'list' ? (
        <ListWrapper horizontal showHorizontalIndicator={false}>
          {list.length > 0 ? list.map(movie => (
            <MovieCard key={movie.imdbID} type={type} {...movie} />
          )) : (
            <NoListWrapper>
              <MovieText>No list.</MovieText>
            </NoListWrapper>
          )}
        </ListWrapper>
      ) : (
        <GridWrapper showVerticalIndicator={false}>
          <GridListWrapper>
            {list.length > 0 ? list.map(movie => (
              <MovieCard key={movie.imdbID} type={type} {...movie} />
            )) : (
              <NoListWrapper>
                <MovieText>No list.</MovieText>
              </NoListWrapper>
            )}
          </GridListWrapper>
        </GridWrapper>
      )}
    </SafeAreaView>
  )
});

export default MovieList;