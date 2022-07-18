import { AreaObject, ChannelObject, Position } from 'src/model/channel';

export const all_index = -1;

export interface ChannelState {
  current: ChannelObject;
  hasUnSave: boolean;
  previewUrl: string;
  changeName: (name: string) => void;
  changeCameraUrl: (url: string) => void;
  toggleUseChannel: () => void;
}

export interface AreaState {
  current: AreaObject | null;
  selected: number;
  delete: () => void;
  changeColor: (color: string) => void;
  clearPosition: () => void;
  addPosition: (pos: Position) => void;
}
