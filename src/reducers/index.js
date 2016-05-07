import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { items } from './items';
import { auth } from './auth';
import { votes } from './votes';


const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  items,
  auth,
  votes
});

export default rootReducer;
