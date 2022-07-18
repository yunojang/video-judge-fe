import { combineReducers } from '@reduxjs/toolkit';

import user from '../reducer/user';
import canvas from '../reducer/canvas';
import channel from '../reducer/channel';
import dashboard from '../reducer/dashboard';

const reducer = { user, canvas, channel, dashboard };

export default combineReducers(reducer);
