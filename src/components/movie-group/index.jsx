import React, { memo } from 'react';
import styled from 'styled-components/native';
import MovieList from '../movie-list';

const Wrapper = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.typography.small};
  font-weight: bold;
  padding: ${props => props.theme.typography.px([10, 10, 5])};
`;

const MovieGroup = memo(({ type, title, list }) => {
  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <MovieList list={list} type={type} />
    </Wrapper>
  )
});

export default MovieGroup;