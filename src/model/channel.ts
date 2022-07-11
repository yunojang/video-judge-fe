export interface ThresholdBase {
  id: number;
  seq: number;
  channelAreaId: number;
  modelId: number;
  outputClassId: number;
  useThis: boolean;
  threshold: boolean;
  createDate: Date;
}

export enum AreaType {
  Rect = 'rect',
  Polygon = 'polygon',
}

export type RectCoordinate = [number, number, number, number];
interface RectPosition {
  type: AreaType.Rect;
  coordinate: RectCoordinate;
}

export const isRectCoordinate = (c: number[]): c is RectCoordinate => {
  return c.length === 4;
};

export type PolyCoordinate = number[];
interface PolyPosition {
  type: AreaType.Polygon;
  coordinate: PolyCoordinate;
}

export type Position = RectPosition | PolyPosition;

export const isRect = (position: Position): position is RectPosition => {
  return position.type === AreaType.Rect;
};

interface AreaObjectProps {
  seq?: number;
  channelId?: number;
  createDate?: Date;
  name?: string;
  useArea?: boolean;
  description?: string;
  threshold?: ThresholdBase[];
  position?: Position[];
  color?: string;
  alpha?: number;
}

export class AreaObject {
  name: string;
  color: string;
  alpha: number;
  useArea: boolean;
  seq: number;
  channelId: number;
  createDate: Date;
  description: string;
  threshold: ThresholdBase[];
  position: Position[];

  constructor({
    seq = 0,
    channelId = 0,
    createDate = new Date(),
    name = 'Area',
    useArea = true,
    description = '',
    threshold = [],
    position = [],
    color = '#55aaee',
    alpha = 0.2,
  }: AreaObjectProps) {
    this.seq = seq;
    this.channelId = channelId;
    this.createDate = createDate;
    this.name = name;
    this.useArea = useArea;
    this.description = description;
    this.threshold = threshold;
    this.position = position;
    this.color = color;
    this.alpha = alpha;
  }
}

interface ChannelProps {
  channelName?: string;
  cameraSrc?: string;
  useAlarm?: boolean;
  useInference?: boolean;
  useSend?: boolean;
  position?: string;
  description?: string;
  area?: AreaObject[];
}

export class ChannelObject {
  channelName: string;
  cameraSrc: string;
  useAlarm: boolean;
  useInference: boolean;
  useSend: boolean;
  position: string;
  description: string;
  area: AreaObject[];

  constructor({
    channelName = 'Channel',
    cameraSrc = 'rtsp://',
    description = '',
    position = '',
    useAlarm = false,
    useInference = false,
    useSend = false,
    area = [],
  }: ChannelProps) {
    this.channelName = channelName;
    this.cameraSrc = cameraSrc;
    this.description = description;
    this.position = position;
    this.useAlarm = useAlarm;
    this.useInference = useInference;
    this.useSend = useSend;
    this.area = area;
  }
}

// get response model
export interface Channel extends ChannelObject {
  id: number;
  createDate: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isChannel = (data: any): data is Channel => {
  const hasId = typeof data?.id === 'number';
  const hasName = typeof data?.channelName === 'string';
  const hasDescription = typeof data?.description === 'string';

  return hasId && hasName && hasDescription;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isChannels = (data: Array<any>): data is Channel[] => {
  return !data.some(elem => !isChannel(elem));
};
