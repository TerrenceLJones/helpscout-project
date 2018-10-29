// Creates a centralized location to locate API related concerns.
// Given an event type of `LOAD_RESOURCE_REQUEST` the following state
// would be created:
/*
  {
    loading: {
        LOAD_RESOURCE: (undefined or true when loading and false after load)
    },
    lastFetch: {
        LOAD_RESOURCE: (undefined or a timestamp set after successful fetch)
    },
    errors: {
        LOAD_RESOURCE: (undefined or an error string )
    }
  }
*/
import { combineReducers } from 'redux';
import _ from 'lodash';

const loadingDataReducer = (state = {}, { type } = {}) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: _.isEqual(requestState, 'REQUEST')
  };
};

const errorsReducer = (state = {}, { type, payload } = {}) => {
  const matches = /(.*)_(REQUEST|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  const errorMessage = _.get(payload, 'message');

  return {
    ...state,
    [requestName]: _.isEqual(requestState, 'FAILURE') ? errorMessage : '',
  };
};

const lastFetchReducer = (state = {}, { type, payload } = {}) => {
  const matches = /(.*)_(REQUEST|SUCCESS)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: _.isEqual(requestState, 'SUCCESS') ? new Date() : '',
  };
};

const selectors = {
  createLoadingSelector(actions) {
    return (state) => {
      return _(actions)
        .some((action) => _.get(state, `api.loading.${action}`));
    }
  },
  createErrorMessageSelector(actions) {
    return (state) => {
      return _(actions)
        .map((action) => _.get(state, `api.errors.${action}`))
          .compact()
          .first() || '';
      };
  }
};

export {
  loadingDataReducer,
  errorsReducer,
  lastFetchReducer,
  selectors
};

export default combineReducers({
  errors: errorsReducer,
  loading: loadingDataReducer,
  lastFetch: lastFetchReducer
});
