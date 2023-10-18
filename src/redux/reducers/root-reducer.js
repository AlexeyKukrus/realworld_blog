import { combineReducers } from 'redux';

import reducerArticles from './articles-reducer';
import reducerUsers from './users-reducer';

const rootReducer = combineReducers({
  reducerArticles,
  reducerUsers,
});

export default rootReducer;
