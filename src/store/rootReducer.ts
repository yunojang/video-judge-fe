import { combineReducers } from '@reduxjs/toolkit';

import user from '../reducer/user';

const reducer = { user };

export default combineReducers(reducer);
