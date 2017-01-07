import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { auth } from './auth';
import { votes } from './votes';
import { resolutions } from './resolutions';



const rootReducer = combineReducers({
  form: formReducer,
  /* your reducers */
  auth,
  resolutions,
  votes
});

export default rootReducer;
