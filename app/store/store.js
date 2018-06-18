import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import chat from './reducers/chat';

const reducer = combineReducers({
	user,
	chat,
});

export default createStore(reducer, applyMiddleware(thunk));