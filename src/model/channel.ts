import { Position } from 'src/views/canvas/types';

export interface AreaObject {
  color: string;
  position: Position;
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
