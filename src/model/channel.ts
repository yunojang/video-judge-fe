import { Area } from 'src/canvas/CanvasClass';

interface Threshold {
  seq: number;
  modelId: number;
  outputClassId: number;
  use: boolean;
  threshold: boolean;
  createDate: Date;
}

export interface ChannelData {
  name: string;
  cameraSrc: string;
  description: string;
  useInference: boolean;
  useAlarm: boolean;
  useSend: boolean;
  createDate: Date;
  area: Area[]; // 나중에 실제 모델로 변경
  threshold: Threshold[];
}

// get response model
export interface Channel extends ChannelData {
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
