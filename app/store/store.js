import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './reducers/user';
import chat from './reducers/chat';
import office from './reducers/office';

const reducer = combineReducers({
	user,
	chat,
	office,
});

export default createStore(reducer, applyMiddleware(thunk));