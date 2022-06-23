import { Area } from 'src/views/canvas/testClass';

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
