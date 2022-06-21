import { getResolution, WidthProps, HeightProps } from './utils/screen';

interface CanvasProps {
  width?: number;
  height?: number;
  boxes?: Box[];
}

export class Canvas {
  boxes: Box[];
  width: number;
  height: number;

  constructor({ width, height, boxes = [] }: CanvasProps) {
    this.boxes = boxes;

    if (!(width || height)) {
      width = 640;
    }

    const { width: w, height: h } = getResolution({ width, height } as
      | WidthProps
      | HeightProps);

    this.width = w;
    this.height = h;
  }
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Position {
  start: Coordinate;
  end: Coordinate;
}

type FillType = 'inner' | 'outer' | false;

interface BoxProps {
  position: Position;
  color?: string;
  fillAlpha?: number;
  fillType?: FillType;
}

export class Box {
  position: Position;
  fillAlpha: number;
  fillType: FillType;
  color: string;

  constructor({
    color = '#4c4c4c',
    fillAlpha = 0.25,
    position,
    fillType = 'inner',
  }: BoxProps) {
    this.color = color;
    this.fillAlpha = fillAlpha;
    this.position = position;
    this.fillType = fillType;
  }
}
