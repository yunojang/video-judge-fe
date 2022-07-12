import { AreaObject, ChannelObject, Position } from 'src/model/channel';

export const all_index = -1;

export interface ChannelState {
  current: ChannelObject;
  changeName: (name: string) => void;
  isModified: boolean;
}

export interface AreaState {
  current: AreaObject | null;
  selected: number;
  delete: () => void;
  changeColor: (color: string) => void;
  clearPosition: () => void;
  addPosition: (pos: Position) => void;
}
