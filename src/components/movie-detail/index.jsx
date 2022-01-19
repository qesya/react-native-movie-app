import React, { memo, useMemo } from 'react';
import { Dimensions, Modal } from 'react-native';
import styled from 'styled-components/native';
import { connectToStore } from '../../helpers';

const { width, height } = Dimensions.get('window');

const AbsoluteWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const CloseWrapper = styled.TouchableOpacity`
  flex: 1;
`;

const ModalContainer = styled.TouchableOpacity`
  flex: 1;
  background-color: ${props => props.theme.color.grey8};
  border-top-left-radius: ${props => props.theme.typography.small};
  border-top-right-radius: ${props => props.theme.typography.small};
  margin-top: ${props => props.theme.typography.px(height - 330)};
  padding: ${props => props.theme.typography.px([20, 10])};
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
`;

const VerticalWrapper = styled.View`
  align-items: flex-start;
  justify-content: flex-start;
`;

const MovieImage = styled.Image`
  width: ${width / 3}px;
  height: ${(width / 3) * 1.5}px;
`;

const TitleText = styled.Text`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.typography.px(20)};
  font-weight: bold;
  margin-bottom: ${props => props.theme.typography.px(20)};
`;

const SmallText = styled.Text`
  color: ${props => !!props.added ? props.theme.color.red : props.theme.color.green};
  font-size: ${props => props.theme.typography.px(14)};
  font-weight: bold;
`;

const XsmallText = styled.Text`
  color: ${props => props.theme.color.white};
  font-size: ${props => props.theme.typography.px(13)};
  margin: ${props => props.theme.typography.px([5, 0])};
  opacity: ${props => !!props.disabled ? '0.5' : '1'};
`;

const XsmallBoldText = styled(XsmallText)`
  font-weight: bold;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => !!props.added ? props.theme.color.red : props.theme.color.green};
  border-radius: ${props => props.theme.typography.px(6)};
  padding: ${props => props.theme.typography.px([7, 10])};
  margin: ${props => props.theme.typography.px([20, 0])};
`;

const ButtonBlacklist = styled(Button)`
  margin-left: ${props => props.theme.typography.px(10)};
`;

const MovieDetail = memo(({ show, detail, favorites, blacklists, setMovie, setUser }) => {
  const { Poster, Title, ...restDetail } = detail;

  const handleCloseModal = () => {
    setMovie(state => ({
      ...state,
      detailVisible: false,
    }));
  };

  const inFavorites = useMemo(() => favorites.find(x => x.imdbID === detail.imdbID), [favorites, detail.imdbID]);
  const inBlacklist = useMemo(() => blacklists.find(x => x.imdbID === detail.imdbID), [blacklists, detail.imdbID]);

  const handleToggleFavorit = () => {
    if (inFavorites) {
      return setUser(state => ({
        ...state,
        favorites: state.favorites.filter(x => x.imdbID !== detail.imdbID),
      }));
    }
    return setUser(state => ({
      ...state,
      blacklists: state.blacklists.filter(x => x.imdbID !== detail.imdbID),
      favorites: [...state.favorites, detail],
    }));
  }

  const handleToggleBlacklist = () => {
    if (inBlacklist) {
      return setUser(state => ({
        ...state,
        blacklists: state.blacklists.filter(x => x.imdbID !== detail.imdbID),
      }));
    }
    return setUser(state => ({
      ...state,
      favorites: state.favorites.filter(x => x.imdbID !== detail.imdbID),
      blacklists: [...state.blacklists, detail],
    }));
  }

  return (
    <AbsoluteWrapper>
        <Modal
          animationType="slide"
          transparent={true}
          visible={show}
          onRequestClose={handleCloseModal}
        >
          <CloseWrapper onPress={handleCloseModal} activeOpacity={1}>
            <ModalContainer activeOpacity={1}>
              <HorizontalWrapper>
                {Poster && <MovieImage source={{uri: Poster }} />}
                <HorizontalWrapper marginLeft={15}>
                  <VerticalWrapper>
                    {Title && <TitleText>{Title}</TitleText>}
                    {Object.entries(restDetail).map(([key, value]) => (
                      <HorizontalWrapper key={key}>
                        <XsmallBoldText>{key}</XsmallBoldText>
                        <XsmallText>: {value}</XsmallText>
                      </HorizontalWrapper>
                    ))}
                  </VerticalWrapper>
                </HorizontalWrapper>
              </HorizontalWrapper>
              <HorizontalWrapper>
                <Button onPress={handleToggleFavorit} added={!!inFavorites}>
                  <SmallText added={!!inFavorites}>{!!inFavorites ? '-' : '+'} Favorite</SmallText>
                </Button>
                <ButtonBlacklist onPress={handleToggleBlacklist} added={!!inBlacklist}>
                  <SmallText added={!!inBlacklist}>{!!inBlacklist ? '-' : '+'} Blacklist</SmallText>
                </ButtonBlacklist>
              </HorizontalWrapper>
            </ModalContainer>
          </CloseWrapper>
        </Modal>
    </AbsoluteWrapper>
  )
});

export default connectToStore(
  {
    show: ['movie', 'detailVisible'],
    detail: ['movie', 'detail'],
    favorites: ['user', 'favorites'],
    blacklists: ['user', 'blacklists'],
  },
  ['movie', 'user']
)(MovieDetail);