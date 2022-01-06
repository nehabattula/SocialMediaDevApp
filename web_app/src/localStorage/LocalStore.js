import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducerIndex from '../reducers';

const initialState = {};
const middleware = [thunk];

const store = createStore(reducerIndex, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;