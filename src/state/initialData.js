import { buildSingleReducer } from '../helpers';

const initialMovieData = {
  list: [],
  detailVisible: false,
  detail: {}
};

const initialUserData = {
  favorites: [],
  blacklists: [],
}

const initialNetworkData = {
  isConnected: false
}

export const storeDef = [
  {
    reducerName: 'movie',
    data: initialMovieData,
  },
  {
    reducerName: 'user',
    data: initialUserData,
  },
  {
    reducerName: 'network',
    data: initialNetworkData,
  },
];

export const initialState = Object.fromEntries(
  storeDef.map((store) => [store.reducerName, buildSingleReducer(store)])
);
