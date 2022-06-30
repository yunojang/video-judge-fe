import { Area } from 'src/canvas/CanvasClass';

interface ThresholdBase {
  seq: number;
  channelAreaId: number;
  modelId: number;
  outputClassId: number;
  useThis: boolean;
  threshold: boolean;
  createDate: Date;
}

interface Threshold extends ThresholdBase {
  id: number;
}

export interface ChannelAreaBase {
  seq: number;
  videoId: number;
  name: string;
  useArea: boolean;
  descripton: string;
  createDate: Date;
  threshold: Threshold[];
}

export interface ChannelPublic {
  name: string;
  description: string;
  useInference: boolean;
  useAlarm: boolean;
  useSend: boolean;
  area: Area[]; // 나중에 실제 모델로 변경
  position: string;
  cameraSrc: string;
  createDate: Date;
}

// get response model
export interface Channel extends ChannelPublic {
  id: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isChannel = (data: any): data is Channel => {
  const hasId = typeof data.id === 'number';
  const hasName = typeof data.name === 'string';
  const hasDescription = typeof data.description === 'string';
  const hasArea = 'area' in data;

  return hasId && hasName && hasDescription && hasArea;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isChannels = (data: Array<any>): data is Channel[] => {
  return data.some(elem => !isChannel(elem));
};
