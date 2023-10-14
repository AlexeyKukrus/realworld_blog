import { combineReducers } from 'redux';

import reducerArticles from './articles-reducer';

const rootReducer = combineReducers({
  reducerArticles,
});

export default rootReducer;
