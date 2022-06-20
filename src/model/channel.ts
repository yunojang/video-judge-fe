import { Position } from 'src/views/canvas/types';

interface AreaObject extends Position {
  color: string;
}

export interface ChannelData {
  name: string;
  description: string;
  area: AreaObject[];
  alarm: boolean;
  judgement: boolean;
  url: string;
}

export interface Channel extends ChannelData {
  id: number;
}
