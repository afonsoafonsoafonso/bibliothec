import { createStore, applyMiddleware, combineReducers } from 'redux';

//reducers
import dbpediaReducer from './dbpedia';

//middlewares
import { dbpediaMiddleware } from './dbpedia';

const rootReducer = combineReducers({
    dbpedia: dbpediaReducer,
});

const middlewares = [dbpediaMiddleware];

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

export default store;