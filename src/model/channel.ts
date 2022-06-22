import { Position } from 'src/views/canvas/types';

export interface AreaData {
  color: string;
  position: Position;
}

export interface AreaObject extends AreaData {
  parentId: number;
}

export interface Area extends AreaObject {
  id: number;
}

export interface ChannelData {
  name: string;
  description: string;
  alarm: boolean;
  judgement: boolean;
  url: string;
}

export interface Channel extends ChannelData {
  id: number;
}
