import React, { useState } from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';

import MovieDetail from '../../components/movie-detail';
import MovieGroup from '../../components/movie-group';

import { connectToStore, requestApi } from '../../helpers';

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: ${props => props.isConnected ? props.theme.color.black : props.theme.color.oldred};
  padding: ${props => props.theme.typography.px([10, 0])};
`;

const BackButton = styled.TouchableOpacity`
  padding: ${props => props.theme.typography.px([8, 10, 16])};
`;

const SmallText = styled.Text`
  color: ${props => !!props.disabled ? props.theme.color.grey5 : props.theme.color.white};
  font-size: ${props => props.theme.typography.px(14)};
  font-weight: bold;
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SearchButton = styled.TouchableOpacity`
  width: 80px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => !!props.disabled ? props.theme.color.grey5 : props.theme.color.white};
  border-radius: ${props => props.theme.typography.px(12)};
  padding: ${props => props.theme.typography.px([7, 10])};
  margin-right: ${props => props.theme.typography.px(10)};
`;

const SearchInputBar = styled.TextInput`
  flex: 1;
  color: ${props => props.theme.color.white};
  background-color: rgba(255, 255, 255, 0.4);
  border: 1px solid ${props => props.theme.color.gray2};
  border-radius: ${props => props.theme.typography.px(12)};
  font-size: ${props => props.theme.typography.px(14)};
  padding: ${props => props.theme.typography.px([5, 10])};
  margin: ${props => props.theme.typography.px([5, 10])};
`;

const SearchScreen = ({ navigation, isConnected, setMovie }) => {

  const [keyword, setKeyword] = useState('');
  const [keywordPlaceholder, setKeywordPlaceholder] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const handleBack = () => navigation.goBack();
  const handleChange = value => setKeyword(value);

  const handleSearchMovie = () => {
    Keyboard.dismiss();
    requestApi({
      s: keyword
    })
    .then(res => {
      setKeywordPlaceholder(keyword);
      setSearchResult(res.Search);
      if (!!res.Search && res.Search.length > 0) {
        setMovie(state => ({
          ...state,
          list: res.Search,
        }));
      }
    });
  }

  return (
    <Wrapper isConnected={isConnected}>
      <BackButton onPress={handleBack}>
        <SmallText>Back</SmallText>
      </BackButton>
      <HorizontalWrapper>
        <SearchInputBar autoFocus value={keyword} onChangeText={handleChange} />
        <SearchButton onPress={handleSearchMovie} disabled={!keyword}>
          <SmallText disabled={!keyword}>Search</SmallText>
        </SearchButton>
      </HorizontalWrapper>
      <MovieGroup
        type="grid"
        title={`Search result for: ${keywordPlaceholder}`}
        list={searchResult}
      />
    </Wrapper>
  )
}

export default connectToStore(
  {
    isConnected: ['network', 'isConnected'],
  },
  ['movie']
)(SearchScreen);