import { User } from './user';
import { Post } from './post';
import { Channel } from './channel';
import { AlertPublic } from './alert';
import { AlgorithmModel } from './algorithmModel';

export type ListType = AlgorithmModel | AlertPublic | Channel | Post | User;
