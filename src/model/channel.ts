import { Area } from 'src/views/canvas/CanvasClass';

// model
// export interface Area{

// }

export interface ChannelData {
  name: string;
  description: string;
  alarm: boolean;
  inference: boolean;
  area: Area[]; // 나중에 실제 모델로 변경
  url: string;
}

export interface Channel extends ChannelData {
  id: number;
}

export const isChannel = (data: any): data is Channel => {
  const hasId = typeof data.id === 'number';
  const hasName = typeof data.name === 'string';
  const hasDescription = typeof data.description === 'string';
  const hasArea = 'area' in data;

  return hasId && hasName && hasDescription && hasArea;
};
