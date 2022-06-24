export interface AlertPublic {
  alarmTitmestamp?: Date;

  videoId?: number;

  videoName?: string;

  title?: boolean;

  message?: string;

  criticalLevel?: string;

  outputClass?: OutputClassPublic;

  threshold?: number;

  sender?: string;

  responcer?: string;

  image?: Array<ImagePublic>;

  recordVideo?: Array<RecordVideoPublic>;
}

export interface OutputClassPublic {
  modelId?: number;

  name?: string;

  message?: string;

  description?: string;

  createDate?: Date;

  videoId?: number;

  id: number;
}

export enum KindEnum {
  Base64 = 'base64',
  Url = 'url',
}

export interface ImagePublic {
  createTimestamp?: Date;

  image?: string;

  width?: number;

  height?: number;

  type?: string;

  kind?: KindEnum;

  alertId?: number;

  id: number;
}

export interface RecordVideoPublic {
  createTimestamp?: Date;

  name?: string;

  path?: string;

  width?: number;

  height?: number;

  length?: number;

  alertId?: number;

  id: number;
}
