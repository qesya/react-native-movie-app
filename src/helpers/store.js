import { connect } from 'react-redux';
import { get, isFunction, isString } from 'lodash';
import { constantCase, camelCase } from 'change-case';

const buildActionName = reducerName => {
  if (isString(reducerName)) {
    return `SET_${constantCase(reducerName)}`;
  }
  throw new Error(`A reducer name is not a string.`);
};

const buildMapState = reduxState => state => {
  return Object.entries(reduxState).reduce((acc, [alias, path]) => {
    return {
      ...acc,
      [alias]: get(state, path)
    };
  }, {});
};

const buildMapAction = reduxAction => dispatch => {
  return Object.fromEntries(
    reduxAction.map(singlReduxAction => {
      const type = buildActionName(singlReduxAction);
      const target = singlReduxAction;
      return [
        camelCase(type),
        payload =>
          dispatch({
            type,
            target,
            payload
          })
      ];
    })
  );
};

export const buildSingleReducer = singleStore => {
  const defaultAction = buildActionName(singleStore.reducerName);
  const reducerTarget = singleStore.reducerName;
  const initialState = singleStore.data;
  return (state = initialState, action) => {
    if (reducerTarget === action.target) {
      switch (action.type) {
        case defaultAction: {
          if (isFunction(action.payload)) {
            return action.payload(state);
          }
          return { ...state, ...action.payload };
        }
        default: {
          return state;
        }
      }
    } else {
      return state;
    }
  };
};

export const connectToStore =
  (reduxState = {}, reduxAction = []) =>
  component => {
    return connect(
      buildMapState(reduxState),
      buildMapAction(reduxAction)
    )(component);
  };