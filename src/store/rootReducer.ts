import { combineReducers } from '@reduxjs/toolkit';

import user from '../reducer/user';
import canvas from '../reducer/canvas';
import channel from '../reducer/channel';

const reducer = { user, canvas, channel };

export default combineReducers(reducer);
