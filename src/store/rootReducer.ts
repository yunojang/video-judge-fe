import { combineReducers } from '@reduxjs/toolkit';

import user from '../reducer/user';
import canvas from '../reducer/canvas';

const reducer = { user, canvas };

export default combineReducers(reducer);
