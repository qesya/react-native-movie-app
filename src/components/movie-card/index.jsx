import React, { memo, useMemo } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connectToStore } from '../../helpers';

const width = Dimensions.get('window').width;

const CardWrapper = styled.TouchableOpacity``;

const StyledImageBackground = styled.ImageBackground`
  justify-content: center;
  margin: ${props => props.theme.typography.px(5)};
  width: ${(width - 30) / 3}px;
  height: ${(width - 30) / 3 * 1.5}px;
`;


const Wrapper = styled.View`
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
  padding: ${props => props.theme.typography.px([5, 7])};
  width: ${(width - 30) / 3}px;
  height: ${(width - 30) / 3 * 1.5}px;
`;

const MovieTitle = styled.Text`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.typography.px(14)};
  font-weight: bold;
  text-shadow: 0 1px 7px rgba(0, 0, 0, 1);
`;

const MovieTextRight = styled.Text`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.typography.px(12)};
  font-weight: bold;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 1);
  text-align: right;
`;

const MovieCard = memo(({ type, Poster, Title, Year = '', setMovie, ...props }) => {
  const transformedYear = useMemo(() =>
    Year.includes('–') ?
      Year.split('–')[0] :
      Year
  , [Year]);

  const handleShowDetail = () => {
    setMovie(state => ({
      ...state,
      detailVisible: true,
      detail: {
        ...props,
        Poster,
        Title,
        Year,
      }
    }))
  };

  const _renderWrapper = () => (
    <Wrapper type={type}>
      <MovieTitle>{Title}</MovieTitle>
      {Year && <MovieTextRight>{transformedYear}</MovieTextRight>}
    </Wrapper>
  )

  return (
    <CardWrapper onPress={handleShowDetail} activeOpacity={0.5}>
      {Poster ? (
        <StyledImageBackground
          type={type}
          source={{ uri: Poster }}
          imageStyle={{ borderRadius: 6 }}
          resizeMode="cover"
        >
          {_renderWrapper()}
        </StyledImageBackground>
      ) : _renderWrapper()
    }
    </CardWrapper>
  )
});

export default connectToStore(
  {},
  ['movie']
)(MovieCard);